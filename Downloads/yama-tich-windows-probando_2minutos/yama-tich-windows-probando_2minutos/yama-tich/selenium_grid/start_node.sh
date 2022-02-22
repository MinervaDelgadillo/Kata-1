#! /usr/bin/bash

if [[ $1 == "--help" ]]; then
  echo "Add a (chrome driver) node to the (selenium) grid"
  echo "\n\r"
  echo "usage: "
  echo "  $ sh start_grid.sh [chromedriver] [selenium grid url]"
  echo "\r\n"
  echo "defaults on env variables:"
  echo "  \$CHROMEDRIVERPATH (./chromedriver-linux64)"
  echo "  \$SELENIUMSERVER (http://localhost:4444/register"
  echo "\n\r"
  echo "if you install the node project use this chromedriver ../node_modules/chromedriver/bin/chromedriver"
  exit 1
fi

# defaults
export CHROMEDRIVERPATH="${CHROMEDRIVERPATH:-./chromedriver-linux64}"
chromedriver=${1:-$CHROMEDRIVERPATH}
export SELENIUMSERVER="${SELENIUMSERVER:-http://localhost:4444/register}"
grid_server="${2:-$SELENIUMSERVER}"


java -Dwebdriver.chrome.driver=$chromedriver -jar selenium-server-standalone-3.141.59.jar -role webdriver -hub $grid_server -port 5566 -log log.txt

