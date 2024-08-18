import { createArrayCsvWriter } from "csv-writer";
import LineReader from "n-readlines"
import { URL } from "url"
import { exit } from "process"

// Get the given filename
const filename = process.argv[2]

if (!filename) {
    console.error('Provide a log file to read. Example: `yarn parse:all-laundry all_laundry_1_to_1501.log`')
    exit(1)
}

// Parse the logs
const lineReader = new LineReader(filename)

let line
let records = []

while (line = lineReader.next()) {
    line = line.toString()
    if (line.includes('[Found]')) {
        records.push(line.split('"')[1].split('[Found] ')[1].split(','))
    }
}

// Write a CSV of all found CVAs
let outputFilename = filename.split('.')
outputFilename[outputFilename.length - 1] = 'csv'
outputFilename = outputFilename.join('.')

const csvWriter = createArrayCsvWriter({
    path: new URL(`../output/${outputFilename}`, import.meta.url),
    header: ['cva', 'address', 'city', 'state', 'zip', 'active'],
    alwaysQuote: true
})

csvWriter.writeRecords(records)
