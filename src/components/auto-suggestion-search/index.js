import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
import keyMirror from 'keymirror'
import { InputGroup, Form, FormControl, Button, ListGroup, Spinner, Card } from 'react-bootstrap'

const ACTION_TYPES = keyMirror({
    SEARCHING: null,
    SUGGESTIONS_LOADED: null,
    RESET: null
});

const initialState = {
    keyword: '',
    suggestionLoading: false,
    suggestions: []
};

function reducer(state, action) {
    const { type, ...payloads } = action
    switch (action.type) {
        case ACTION_TYPES.SEARCHING:
            return {
                ...state,
                keyword: payloads.keyword,
                suggestionLoading: true
            }
        case ACTION_TYPES.SUGGESTIONS_LOADED:
            return {
                ...state,
                suggestionLoading: false,
                suggestions: payloads.suggestions
            }
        case ACTION_TYPES.RESET:
            return initialState
    }

    return state
}

const debounceLoadSuggestions = debounce(async (keyword, handleLoadSuggestions, updateSuggestions) => {
    let suggestions = []
    try {
        suggestions = await handleLoadSuggestions(keyword)
    } catch (ignored) {
        suggestions = []
    }

    updateSuggestions(suggestions)
}, 400)

function SearchInput(props) {
    const { placeholder, onSearch, handleLoadSuggestions, formatSuggestion, disabled } = props
    const [state, dispatch] = useReducer(reducer, initialState)

    function handleChangeKeyword(e) {
        const keyword = e.target.value
        dispatch({
            type: ACTION_TYPES.SEARCHING,
            keyword
        });

        debounceLoadSuggestions(
            keyword,
            handleLoadSuggestions,
            (suggestions) => dispatch({
                type: ACTION_TYPES.SUGGESTIONS_LOADED,
                suggestions: suggestions.map(formatSuggestion)
            })
        )
    }

    function handleSearchByTyping(e) {
        e.preventDefault()

        if (suggestions.length) {
            search(suggestions[0])
        }
    }

    function search(suggestion) {
        debounceLoadSuggestions.cancel()
        dispatch({type: ACTION_TYPES.RESET})
        onSearch(suggestion)
    }

    const { 
        keyword,
        suggestionLoading,
        suggestions
     } = state

    return (
        <div>
            <Form onSubmit={handleSearchByTyping}>
                <InputGroup className='mb-3'>
                    <FormControl
                        placeholder={placeholder}
                        as='input'
                        value={keyword}
                        onChange={handleChangeKeyword}
                        disabled={disabled}
                    />
                    <Button variant='outline-secondary' type='submit'>
                        Search
                    </Button>
                </InputGroup>
            </Form>
            <Card>
                <ListGroup>
                {
                    suggestions.map((suggestion) => {
                        function handleSearchBySuggestionSelected() {
                            return search(suggestion)
                        }

                        const { key, title } = suggestion

                        return (
                            <ListGroup.Item
                                key={key}
                                action
                                variant='light'
                                onClick={handleSearchBySuggestionSelected}
                            >
                                {title}
                            </ListGroup.Item>
                        )
                    })
                }
                </ListGroup>
                {
                    suggestionLoading && <Spinner style={{ margin: '20px auto' }} animation='border'/>
                }
            </Card>
        </div>
    )
}

SearchInput.propTypes = {
    onSearch: PropTypes.func.isRequired,
    handleLoadSuggestions: PropTypes.func.isRequired,
    formatSuggestion: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool
}

SearchInput.defaultProps = {
    placeholder: '',
    disabled: false
}

export default SearchInput

