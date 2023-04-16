import { google, fitness_v1 } from 'googleapis';
/*
async function getDataFromGoogleFit(
  access_token: string,
  startTimeMillis: number,
  endTimeMillis: number,
  bucketByTimeMillis: number,
  dataSourceId: string
) {
  const fitness = google.fitness({ version: 'v1' });
  try {
    const response = await fitness.users.dataset.aggregate({
      userId: 'me',
      requestBody: {
        aggregateBy: [
          {
            dataSourceId: dataSourceId,
          },
        ],
        bucketByTime: { durationMillis: bucketByTimeMillis },
        startTimeMillis: startTimeMillis,
        endTimeMillis: endTimeMillis,
      },
      access_token: access_token,
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });

    for (const bucket of response.data.bucket || []) {
      console.log(bucket.startTimeMillis);
      console.log(bucket.endTimeMillis);
      for (const dataset of bucket.dataset || []) {
        for (const point of dataset.point || []) {
          for (const value of point.value || []) {
            console.log(value.intVal);
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

const access_token =
  'ya29.a0Ael9sCNigxGJ2HgZFnqv7bIyKkWkuP3MBjS_d7LO1roOgIMwyBEWeoGhgZSMyYkk8DmORiTUoH2mllMUZ3mvl0RQhDXO3t2n5EWuZxx9a7YsshbK07iI0TAmIYW1_TK-EWAUtIr4ILsyQ8Frza4B7BEsv5ZccvYaCgYKAa8SARISFQF4udJh6aAtwrFkxvijaGaDGpV58A0166';
const startTime = 1680318000000;
const endTime = 1681141293355;
const bucketByTime = 86400000;
const dataSourceId =
  'derived:com.google.step_count.delta:com.google.android.gms:merge_step_deltas';


export default getDataFromGoogleFit;
*/