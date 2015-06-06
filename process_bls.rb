# http://www.bls.gov/oes/current/oes_11700.htm / http://www.bls.gov/oes/special.requests/oesm14ma.zip
# convert MSA_M2014_dl.xlsx -> wages.csv

# scrape just Asheville #s
require 'csv'
all_wages = CSV.parse(File.read('wages.csv'));0

asheville = all_wages.select{ |r| r[1] == '11700' }

CSV.open("asheville.csv", "w") do |csv|
  csv << all_wages[0]
  asheville.each{ |row| csv << row }
end

#######

# re-import w/ headers
asheville = CSV.read('asheville.csv', headers: true, header_converters: :symbol);0

case r[:a_mean]
  when (0 ... 20_000)         then 1
  when (20_001 ... 34_999)    then 2
  when (35_000 ... 49_999)    then 3
  when (50_000 ... 74_999)    then 4
  when (75_000 ... 1_000_000) then 5
]

#major = asheville.select{ |r| r[:occ_group] == 'major'}
detailed = asheville.select{ |r| r[:occ_group] == 'detailed'}

# map employment groups to income groups
groups = detailed.group_by do |row|
  case row[:a_mean].gsub(',', '').to_i
    when (0 ... 20_000)         then 1
    when (20_001 ... 34_999)    then 2
    when (35_000 ... 49_999)    then 3
    when (50_000 ... 74_999)    then 4
    when (75_000 ... 1_000_000) then 5
  end
end

# calculate the percentages of the workforce in each wage group
groups.map do |i, rows|
  [i, rows.sum{ |r| r[:jobs_1000].to_d / 10 }]
end.sort_by{ |i, percent| i }