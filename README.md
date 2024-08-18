# Scrape Laundry CVA IDs

A simple Cypress scraper for getting CVA IDs from CSC Service Works and A.L.L.

## Your CVA IDs

You can check for your own CVA IDs without running the code. Check [the `output` directory](https://github.com/emma-k-alexandra/Laundry-IDs/tree/main/output). You may need to search over multiple files to find your CVA ID.

## Install

This project uses [Yarn Classic](https://classic.yarnpkg.com/en/docs/install).

```zsh
yarn
```

## CSC Service Works

Run

```zsh
yarn csc-service-works
```

This will scrape CSC Service Works for the first 10,000 CVA IDs. To scrape for more IDs run

```zsh
yard csc-service-works 10001
```

Replacing `10001` with the CVA ID you'd like to start scraping at.

There will be no output to the console unless there is an error.

## A.L.L. Laundry

Run

```zsh
yarn all-laundry
```

Since A.L.L. Laundry requires a login to check for CVA IDs, this script is only able to scrape for about 1,500 CVA IDs at a time. To scrape more IDs, you'll need to run

```zsh
yarn all-laundry 1501
```

Replacing `1501` with the CVA ID you'd like to start scraping at.

There will be no output to the console unless there is an error.

## Output

Found CVA IDs will be in a CSV in the `output` directory, named like `all_laundry_{START ID}_to_{END ID}.cvs`. If an error occurred, there will be no CSV, just a `.log` file with the same name.
