"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//npm install googleapis
const { google } = require('googleapis');
function getDataFromGoogleFit(access_token, startTimeMillis, endTimeMillis, bucketByTimeMillis, dataSourceId) {
    return __awaiter(this, void 0, void 0, function* () {
        const fitness = google.fitness('v1');
        try {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const response = yield fitness.users.dataset.aggregate({
                    userId: 'me',
                    requestBody: {
                        "aggregateBy": [{
                                // The dataSourceID to be get. Change this value to obtain diferents datas
                                "dataSourceId": dataSourceId
                            }],
                        //Slice of time to be get
                        "bucketByTime": { "durationMillis": bucketByTimeMillis },
                        //Start and End time to be get in miliseconds
                        "startTimeMillis": startTimeMillis,
                        "endTimeMillis": endTimeMillis
                    },
                    //Token generated from de Auth2 autentication.
                    access_token: access_token,
                    headers: { 'Content-Type': 'application/json' }
                }).then((response) => {
                    let return_data = [];
                    for (const bucket of response.data.bucket) {
                        let obj = {
                            startTimeMillis: bucket.startTimeMillis,
                            endTimeMillis: bucket.endTimeMillis,
                            value: []
                        };
                        for (const dataset of bucket.dataset) {
                            for (const point of dataset.point) {
                                for (const value of point.value) {
                                    obj.value.push(value);
                                }
                            }
                        }
                        return_data.push(obj);
                    }
                    resolve(return_data);
                }).catch((error) => {
                    console.log(error);
                    return error;
                });
            }));
            let return_data = [];
            for (const bucket of response.data.bucket) {
                let obj = {
                    startTimeMillis: bucket.startTimeMillis,
                    endTimeMillis: bucket.endTimeMillis,
                    value: []
                };
                for (const dataset of bucket.dataset) {
                    for (const point of dataset.point) {
                        for (const value of point.value) {
                            obj.value.push(value);
                        }
                    }
                }
                return_data.push(obj);
            }
            return return_data;
            //console.log(response.data.bucket[0].dataset[0].point[0].value[0].intVal)       
        }
        catch (error) {
            console.error(error);
            return error;
        }
    });
}
const access_token = 'ya29.a0Ael9sCNigxGJ2HgZFnqv7bIyKkWkuP3MBjS_d7LO1roOgIMwyBEWeoGhgZSMyYkk8DmORiTUoH2mllMUZ3mvl0RQhDXO3t2n5EWuZxx9a7YsshbK07iI0TAmIYW1_TK-EWAUtIr4ILsyQ8Frza4B7BEsv5ZccvYaCgYKAa8SARISFQF4udJh6aAtwrFkxvijaGaDGpV58A0166';
const startTime = 1681050054000;
const endTime = 1681054254000;
const bucketByTime = 60000;
const dataSourceId = "derived:com.google.step_count.delta:com.google.android.gms:merge_step_deltas";
exports.getDataFromGoogleFit = getDataFromGoogleFit;
