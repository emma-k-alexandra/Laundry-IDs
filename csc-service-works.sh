NUMBER_OF_IDS_TO_SCRAPE=1000

START=$@
START=${START:-1} # default value for START if not provided
END=$((START + NUMBER_OF_IDS_TO_SCRAPE))

LOG_FILENAME="./output/csc_service_works_${START}_to_${END}.log"

ELECTRON_ENABLE_LOGGING=1 \
CYPRESS_START=$START \
CYPRESS_NUMBER_OF_IDS_TO_SCRAPE=$NUMBER_OF_IDS_TO_SCRAPE \
    npx cypress run \
        --spec 'cypress/integration/csc.service.works.spec.js' \
    > $LOG_FILENAME 2>&1

yarn parse:csc-service-works $LOG_FILENAME
