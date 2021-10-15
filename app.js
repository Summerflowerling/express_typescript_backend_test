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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var express_1 = require("express");
var node_fetch_1 = require("node-fetch");
//const geonamesBaseUrl = 'http://api.geonames.org/searchJSON?';
//const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
//const pixabayUrl = 'https://pixabay.com/api/?key=4772361-58a041a9c4a31b16cbe90fbc1&q=yellow+flowers&image_type=photo';
var app = (0, express_1["default"])();
app.use(express_1["default"].static('src'));
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use(body_parser_1["default"].json());
// Cors for cross origin allowance
//const cors = require('cors');
app.use((0, cors_1["default"])());
app.get('/', function (req, res) {
    //res.sendFile('dist/index.tsx');
    //res.sendFile(path.resolve('src/index.tsx'));
    res.send("Hello");
});
var port = 8085;
app.listen(port, function () { console.log("server running on " + port); });
var isGeoData = function (data) {
    return 'geonames' in data;
};
var isWeatherBitData = function (data) {
    return 'weather' in data;
};
var isPixaBayData = function (data) {
    return 'hits' in data;
};
app.post('/getGeoname', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var API_URL, myPromise, weatherbitRes, weatherbitPromiseObjType, pixabayRes, myData, lng, lat, weatherbit, weatherbitPromise, pixabay, pixabayPrimose, error_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                API_URL = "http://api.geonames.org/searchJSON?q=\"paris\"&maxRows=1&username=iku124";
                return [4 /*yield*/, (0, node_fetch_1["default"])(API_URL)];
            case 1:
                myPromise = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 13, , 14]);
                if (!myPromise) return [3 /*break*/, 12];
                return [4 /*yield*/, myPromise.json()];
            case 3:
                myData = _a.sent();
                if (!isGeoData(myData)) return [3 /*break*/, 12];
                _a.label = 4;
            case 4:
                _a.trys.push([4, 11, , 12]);
                lng = myData.geonames[0].lng;
                lat = myData.geonames[0].lat;
                return [4 /*yield*/, (0, node_fetch_1["default"])("https://api.weatherbit.io/v2.0/forecast/daily?lat=" + lat + "&lon=" + lng + "&days=7&key=25236c54b21347c5acba0d34020a5c84")];
            case 5:
                weatherbit = _a.sent();
                weatherbitRes = weatherbit;
                if (!weatherbitRes) return [3 /*break*/, 8];
                return [4 /*yield*/, weatherbitRes.json()];
            case 6:
                weatherbitPromise = _a.sent();
                if (isWeatherBitData(weatherbitPromise)) {
                    weatherbitPromiseObjType = weatherbitPromise;
                }
                return [4 /*yield*/, (0, node_fetch_1["default"])("https://pixabay.com/api/?key=4772361-58a041a9c4a31b16cbe90fbc1&q=" + req.body.location + "&image_type=photo&editors_choice=true&category=travel")];
            case 7:
                pixabay = _a.sent();
                pixabayRes = pixabay;
                _a.label = 8;
            case 8:
                if (!pixabayRes) return [3 /*break*/, 10];
                return [4 /*yield*/, pixabayRes.json()];
            case 9:
                pixabayPrimose = _a.sent();
                if (isPixaBayData(pixabayPrimose)) {
                    res.send([weatherbitPromiseObjType, pixabayPrimose.hits[0].largeImageURL]);
                    console.log('pixabayPromise', pixabayPrimose.hits[0]);
                }
                _a.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                error_1 = _a.sent();
                res.send([weatherbitPromiseObjType, '/img/backup.png']);
                console.log('Something wrong when fetching the photo', error_1);
                return [3 /*break*/, 12];
            case 12: return [3 /*break*/, 14];
            case 13:
                error_2 = _a.sent();
                alert('Make sure you enter a country or city name');
                return [2 /*return*/];
            case 14: return [2 /*return*/];
        }
    });
}); });
//module.exports = app;
