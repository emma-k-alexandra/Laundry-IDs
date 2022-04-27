NUMBER_OF_IDS_TO_SCRAPE=1000

START=$@
START=${START:-1} # default value for START if not provided
END=$((START + NUMBER_OF_IDS_TO_SCRAPE))

LOG_FILENAME="./output/all_laundry_${START}_to_${END}.log"

ELECTRON_ENABLE_LOGGING=1 npx cypress run \
    --spec 'cypress/integration/all.laundry.spec.js' \
    --env START=$START,NUMBER_OF_IDS_TO_SCRAPE=$NUMBER_OF_IDS_TO_SCRAPE \
    > $LOG_FILENAME 2>&1

yarn parse:all-laundry $LOG_FILENAME
