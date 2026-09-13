# Masjid Arkan website

The public website for Masjid Arkan, Phoenix, Arizona.

## Updating Iqamah times

The modern home page reads the daily schedule from `files/prayertime.json`.
Update the values in that file and publish the changed file to update the public
website. `jumuah` is optional; leave it blank when the time is not yet confirmed.

```json
{
  "fazar": "6:45 AM",
  "zohar": "1:00 PM",
  "asar": "4:30 PM",
  "magrib": "5:30 PM",
  "isha": "7:45 PM",
  "jumuah": "12:30 PM and 1:30 PM"
}
```

The site is static. A secure online form for non-technical administrators needs
a small hosted backend or a Git-based CMS; it should not be implemented as an
unprotected page in this static site.

<img width="1680" alt="Screen Shot 2021-12-22 at 5 07 05 PM" src="https://user-images.githubusercontent.com/11093819/147189934-49d74a90-39a4-4747-a17f-e4c0c546c36f.png">

<img width="1680" alt="Screen Shot 2021-12-22 at 9 54 04 PM" src="https://user-images.githubusercontent.com/11093819/147189952-fa464fd0-7105-4ffd-9432-473cf6616ca8.png">
