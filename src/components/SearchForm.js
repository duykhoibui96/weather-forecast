import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
import { InputGroup, Form, FormControl, Button, ListGroup, Spinner } from 'react-bootstrap'
import loadLocationList from '../services/loadLocationList'

const searchCities = debounce(async (keyword, setCityList, setLoading) => {
    let cities = []
    if (keyword) {
        cities = await loadLocationList(keyword)
    }

    setCityList(cities)
    setLoading(false)
}, 200)

function SearchForm({ disabled, onSearchWeatherInformation }) {
    const [keyWord, setKeyword] = useState('')
    const [loading, setLoading] = useState(false)
    const [cityList, setCityList] = useState([])


    function handleKeywordChange(event) {
        setLoading(true)
        setKeyword(event.target.value)
    }
    function handleSearchWeatherInformation(e) {
        e.preventDefault()

        if (cityList.length) {
            setKeyword('')
            onSearchWeatherInformation(cityList[0].woeid)
        }
    }


    useEffect(() => {
        searchCities(keyWord, setCityList, setLoading)
    }, [keyWord])

    return (
        <div>
            <Form onSubmit={handleSearchWeatherInformation}>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Searching for a city"
                        as="input"
                        value={keyWord}
                        onChange={handleKeywordChange}
                        disabled={disabled}
                    />
                    <Button variant="outline-secondary" id="button-addon2" type="submit">
                        Search
                    </Button>
                </InputGroup>
            </Form>
            <ListGroup>
            {
                cityList.map(({title, woeid}) => (
                    <ListGroup.Item key={woeid} action variant="light">{title}</ListGroup.Item>
                ))
            }
            <div style={{margin: 'auto', marginTop: 20}}>
            {
                loading && <Spinner animation="border"/>
            }
            </div>
            </ListGroup>
        </div>
    
    )
}

SearchForm.propTypes = {
    onSearchWeatherInformation: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

SearchForm.defaultProps = {
    disabled: false
}

export default SearchForm

