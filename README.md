# Data Generator for Kibana Alerting Framework

This application generates and indexes test data for alerting framework by mimicking Beats. <br>

### Prerequisite:
- `jq` installed globally `brew install jq`
- `npm`

### How to Run:
- `npm install`
- `./generate {indexer}` indexers: `custom-index`, `metrics`, `logs`

**<span style="color:green">Important :</span>** You can modify or add a new doc during the execution. Each indexer listens for changes in their own `docs` directory! So you can turn an _**active**_ alert into **_recovered_** by changing a value in a doc.

Notes:
- Elasticsearch and Kibana must be running.
- It may require you to change `generate` file's permission.  <br>
  Then run: `sudo chmod 755 'generate'`

### How it works:
It has two components:  **Indexers** and  **Generators**.

## Indexers
Indexers are the modules that consume the given json files as schema under `docs` directories in of each of them to generate and push data to Elasticsearch.

There are 3 indexers:
1. **custom-index** <br>
   - Creates an index in Elasticsearch with the given name in its [config](/src/indexers/custom-index/config.ts) file  
   - Generates data by using the schemas under its [docs](/src/indexers/custom-index/docs) directory. (The docs to use must be defined in its config as an array)
   - Pushes generated data to the index that it has created
   
   Generated data could be used to create an `Index Threshold` or `Elasticsearch Query` rule<br><br>
2. **metrics** <br>
   - Installs Metricbeat (if it's not already installed) to format Kibana (Templates, ILM, Dashboard etc.)
   - Creates a Data Stream `metricbeat-{version}`
   - Generates data by using the schemas under its [docs](/src/indexers/metrics/docs) directory. You can add docs as many as you want but don't forget to add them to the modules [config](/src/indexers/metrics/config.ts) 
   - Pushes generated data to the Data Stream that it has created
     <br><br>
    Currently, the metricbeat version (8.1.2) is hardcoded in the `generate` script. <br>
    Generated data could be used to create an `Inventory` or `Metric Threshold` rule<br><br>
3. **logs** <br>
   - Installs Filebeat (if it's not already installed) to format Kibana (Templates, ILM, Dashboard etc.)
   - Creates a Data Stream `filebeat-{version}`
   - Generates data by using the schemas under its [docs](/src/indexers/logs/docs) directory. You can add docs as many as you want but don't forget to add them to the modules [config](/src/indexers/logs/config.ts)
   - Pushes generated data to the Data Stream that it has created 
   <br><br>
   Currently, the filebeat version (8.1.2) is hardcoded in the `generate` script. <br>
   Generated data could be used to create a `Log Threshold` rule

## Generators
Generators are basic data generators that takes an object tah has a `generatorType` and some other parameters and returns a result.<br>

There are 7 generators:
1. **uuid** <br>
   Input schema: 
   ```
   { "generatorType": "uuid" }
   ```
   Output: A random uuid e.g. `19e99b66-b9c6-11ec-8422-0242ac120002` 
   <br><br>
2. **iso8601** <br>
   Input schema:
   ```
   { "generatorType": "iso8601" }
   ```
   Output: Datetime stamp of now e.g. `2022-04-11T17:56:39+00:00`
   <br><br>
3. **increment** <br>
   Input schema: <br>
   ```
   {
   "generatorType": "increment",
   "params": { "id": "1", "start": 1, "incrementBy": 5 }
   }
   ```
   Output: <br> At each execution, a new integer is returned, starting with `start` and increasing the last number held in memory by `incrementBy`. `id` is used to identify the latest value in memory. e.g. 1, 6, 11, 16, 21...
   <br><br>
4. **randomInt** <br>
   Input schema: 
   ```
   {
   "generatorType": "randomInt",
   "params": { "min": 1, "max": 5 }
   }
   ```
   Output: A random integer between `min` and `max` e.g. `2`
   <br><br>
5. **randomFloat** <br>
   Input schema:
   ```
   {
   "generatorType": "randomFloat",
   "params": { "min": 1, "max": 5 }
   }
   ```
   Output: A random float between `min` and `max` e.g. `2.01`
   <br><br>
6. **dictionay** <br>
   Input schema:
   ```
   {
    "generatorType": "dictionary",
    "params": { "value": "word" }   
   }
   ```
   Output: A random word from the given dictionary.<br>
   Dictionaries are stored under `src/generators/dictionaries` directory.   <br>
   There are already two dictionaries `word` and `names`.<br>
   A new dictionary can be simply defined by adding a json file to the dictionay directory and using the file name in the schema. 
   <br><br>
7. **sineWave** <br>
   Input schema: <br>
   ```
   {
    "generatorType": "sineWave",
    "params": {
      "min": 0,
      "max": 8,
      "period": 16
    }
   }
   ```
   Output: <br> At each execution, a new float is returned between `min` and `max` <br>
   e.g. 3 - 4 - 5 - 6 - 7 - 6 - 5 - 4 - 3 - 2 - 1 - 2 - 3 .....<br>
   For more info about sine wave: https://en.wikipedia.org/wiki/Sine_wave
   <br><br>

## Sample Data Schema consumed by an Indexer:

```
{
  "@timestamp": { "generatorType": "iso8601" },
  "name": "test-doc",
  "id": { "generatorType": "uuid" },
  "data_number": {
    "generatorType": "randomInt",
    "params": { "min": 1, "max": 5 }
  },
  "data_float": {
    "generatorType": "randomFloat",
    "params": { "min": 1, "max": 5 }
  },
  "data_string": {
    "generatorType": "dictionary",
    "params": { "value": "word" }
  },
  "data_nested": {
    "cpu": {
      "usage": {
        "generatorType": "randomFloat",
        "params": { "min": 1, "max": 5 }
      }
    }
  },
  "data_increment": {
    "generatorType": "increment",
    "params": { "id": "1", "start": 1, "incrementBy": 5 }
  },
  "data_wave": {
    "generatorType": "sineWave",
    "params": {
      "min": 0,
      "max": 8,
      "period": 16
    }
  }
}
```