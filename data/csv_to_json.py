import csv
import json
import sys

# mapping of field to column number
vendor_id	=	0
dealer_name	=	1
address_line1	=	2
address_line2	=	3
address_line3	=	4
address_line4	=	5
city	=	6
state	=	7
ZIP	=	8
area_code	=	9
phone	=	10
invoice_id	=	11
invoice_num	=	12
invoice_date	=	13
sale_date	=	14
disposal_status	=	15
disposal_facility_nmvtis_id	=	16
disposal_facility_contact_info	=	17
sales_type	=	18
invoice_amount	=	19
trade_in_VIN	=	20
trade_in_vehicle_category	=	21
trade_in_make	=	22
trade_in_model	=	23
trade_in_year	=	24
trade_in_vehicle_drive_train	=	25
trade_in_mileage	=	26
trade_in_title_state	=	27
trade_in_registration_state	=	28
trade_in_registration_start	=	29
trade_in_registration_end	=	30
trade_in_insurance_start	=	31
trade_in_NMVTIS_flag	=	32
trade_in_odometer_reading	=	33
new_vehicle_VIN_trunc	=	34
new_vehicle_category	=	35
new_vehicle_make	=	36
new_vehicle_model	=	37
new_vehicle_year	=	38
new_vehicle_drive_train	=	39
new_vehicle_car_mileage	=	40
new_vehicle_MSRP	=	41

in_csvfile = open(sys.argv[1], 'r')
out_csvfile = open(sys.argv[2], 'w')
out_jsonfile = open(sys.argv[3], 'w')

reader = csv.reader(in_csvfile)
writer = csv.writer(out_csvfile)
json_to_dump = []

territories = set(['GU', 'PR', 'DC', 'MP', 'VI'])

reader.next() # skip the first line of headers
for row in reader:
	if row[state] not in territories:
		row_to_write = [row[state],
						row[invoice_amount],
						row[trade_in_mileage],
						row[new_vehicle_car_mileage]]
		writer.writerow(row_to_write)
		json_to_dump.append(row_to_write)

json.dump(json_to_dump, out_jsonfile)
