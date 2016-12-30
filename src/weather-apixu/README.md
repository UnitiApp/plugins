# Weather-APIXU


## Description ##
This plugin utilizes the API provided by [apixu](https://www.apixu.com/) to fetch the weather. This service is free of charge. Before using this plugin, you must signup for an account to recieve an API Key.

This plugin currently uses a US Zip Code to fetch the weather. If you would like to use another form of retrieval, you can. Take a look at the [docs here](https://www.apixu.com/doc/request.aspx). It only requires you to update the value in the `q` query parameter.


## Configuration Options ##

- `url` - The url of the service to fetch the weather. `http://api.apixu.com/v1/forecast.json?key=YOUR_API_KEY&q=YOUR_ZIP_CODE&days=DAYS_TO_FETCH'` You will need to replace the following values with your own:
    - `YOUR_API_KEY`: with your api key
    - `YOUR_ZIP_CODE `: with your zip code
    - `DAYS_TO_FETCH `: how many days to fetch the weather for


## Contributing ##

If you'd like to contribute plugins, please read the [contributing doc](https://github.com/UnitiApp/uniti-plugins/blob/master/CONTRIBUTE.md).