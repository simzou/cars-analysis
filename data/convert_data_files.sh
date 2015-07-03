
INCSV='full-transactions.csv'
OUTCSV1='full-transactions-trimmed-by-python-1.csv'
OUTCSV2='full-transactions-trimmed-by-python-2.csv'
OUTJSON1='transactions-q1.json'
OUTJSON3='transactions-q3.json'


echo "Converting csv to json for question 1 and 2..."
python csv_to_json.py --inputcsv $INCSV --outputcsv $OUTCSV1 --outputjson $OUTJSON1 --question 1
echo "Converting csv to json for question 3..."
python csv_to_json.py --inputcsv $INCSV --outputcsv $OUTCSV2 --outputjson $OUTJSON3 --question 3
