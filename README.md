# tripinfo-back

Backend for the [TripInfo app](https://github.com/vignesh-sankaran/TripInfo)

## Project purpose

The first release of TripInfo will feature a train timetable for an elected
train station and direction e.g. To City (Flinders Street). As part of the
onboarding process, the user will select a train station and direction.

Unfortunately, PTV's API doesn't have a way to display a list of train directions
from a station's stop id. In order to fetch the list of directions, the
list of lines that the selected station serves is fetched, and the list of
directions available for each line is retrieved. I elected to factor out the
request complexity to a separate backend service.

## Deployment

The backend is hosted on Now at
[https://tripinfo-back-5f2z2veo1.now.sh/](https://tripinfo-back-5f2z2veo1.now.sh/).
There is one endpiont at `station_directions`, with a mandatory query string
parameter for `stop_id`.

An example request using the stop id for Caulfield Railway Station is below:

```
https://tripinfo-back-oy53jahsn.now.sh/station_directions?stop_id=1036
```
