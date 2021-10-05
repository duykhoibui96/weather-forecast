import { render, screen } from "@testing-library/react";
import { DAYS_OF_WEEK } from "../../../constants";
import { parseDate } from "../../../utils/helpers/date";
import WeatherInfo from "../weather-info";

const WEATHER_INFO = {
  id: 4881651424296960,
  weather_state_name: "Heavy Rain",
  weather_state_abbr: "hr",
  wind_direction_compass: "SE",
  created: "2021-10-05T16:39:46.578490Z",
  applicable_date: "2021-10-05",
  min_temp: 24.23,
  max_temp: 31.07,
  the_temp: 30.045,
  wind_speed: 3.208252654436756,
  wind_direction: 145.89574420147287,
  air_pressure: 1006.5,
  humidity: 78,
  visibility: 10.224041597073093,
  predictability: 77,
};

function renderComponent(data = WEATHER_INFO) {
  const {
    id,
    weather_state_name: weatherStateName,
    applicable_date: applicableDate,
    min_temp: minTemp,
    max_temp: maxTemp,
  } = data;

  const props = {
    id,
    weatherStateName,
    weatherImagePath: "some_image_url",
    minTemp: Math.floor(minTemp),
    maxTemp: Math.floor(maxTemp),
    ...parseDate(applicableDate),
  };

  render(<WeatherInfo {...props} />);

  return props;
}

describe("WeatherForecast", () => {
  it("should render data correctly", () => {
    const { id, weatherStateName, minTemp, maxTemp, date, dayOfWeek } =
      renderComponent();

    expect(screen.getByLabelText(`weather-info-${id}`)).toBeVisible();
    expect(screen.getByText(date)).toBeVisible();
    expect(screen.getByText(DAYS_OF_WEEK[dayOfWeek])).toBeVisible();
    expect(screen.getByText(weatherStateName)).toBeVisible();
    expect(screen.getByText(minTemp)).toBeVisible();
    expect(screen.getByText(maxTemp)).toBeVisible();
  });
});
