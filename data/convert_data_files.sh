echo "Converting csv to json for question 1..."

INCSV='full-transactions.csv'
OUTCSV='full-transactions-trimmed-by-python.csv'
OUTJSON='transactions-q1.json'

python csv_to_json.py $INCSV $OUTCSV $OUTJSON