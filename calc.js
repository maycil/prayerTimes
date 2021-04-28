var PrayTime =
{
    dayOfYear: function (calculateDate) {
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = calculateDate - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        return day;

    },

    sunRise: function (dhuhrTime, declination, latitude, EoT) {
        var a = this.getRadian(-1);
        var d = this.getRadian(declination);
        var l = this.calculateLatitude(latitude, declination);
        var hra = this.calculateHourAngle(a,d,l);
        
		return dhuhrTime - hra * 4;
    },

    sunSet: function (dhuhrTime, declination, latitude, EoT) {
        var a = this.getRadian(-1);
        var d = this.getRadian(declination);
        var l = this.calculateLatitude(latitude, declination);
		var hra = this.calculateHourAngle(a,d,l);
        
		return dhuhrTime + hra * 4;
    },

    /*
	trg
	https://www.analyzemath.com/trigonometry/trigonometric_formulas.html
	cos(X - Y) = cosX cosY + sinX sinY
	cosX cosY = (1/2) [ cos (X - Y) + cos (X + Y) ]
	sinX sinY = (1/2) [ cos (X - Y) - cos (X + Y) ]
	
    ω = the hour angle;
    α = the altitude angle;
    δ = the declination angle;
    φ = observer’s latitude.

    sinα = sinδ * sin φ + cosδ * cos ω * cos φ 
    cos ω = (sinα - sinδ * sin φ) / (cosδ * cos φ)  

    */

    dawnTime: function (dhuhrTime, declination, latitude) {  		
		var a = this.getRadian(-18);
        var d = this.getRadian(declination);
        var l = this.calculateLatitude(latitude, declination);
		var hra = this.calculateHourAngle(a,d,l); 
        
		return this.decimalToHour(dhuhrTime - hra * 4);
    },


    fajrBeginTime: function (dhuhrTime, declination, latitude) {
        //sinα = sinδ * sin φ + cosδ * cos ω * cos φ 
        var a = this.getRadian(-9);
        var d = this.getRadian(declination);
        var l = this.calculateLatitude(latitude, declination);
		var hra = this.calculateHourAngle(a,d,l);
		
        return this.decimalToHour(dhuhrTime - hra * 4);

    },

    fajrEndTime: function (sunRise) {
        return this.decimalToHour(sunRise);
    },

    dhuhrTime: function (longitude, EoT, timezone) {
        var dhuhrTime = 720;
        if (longitude && EoT) {
            dhuhrTime = 720 - 4 * longitude - EoT + timezone * 60;
        }
        return dhuhrTime;
    },

    asrTime: function (dhuhrTime, declination, latitude) {
        var d = this.getRadian(declination);
        var l = this.calculateLatitude(latitude, declination);
        var a = Math.atan(1 / (1 + Math.tan(l - d)));
		var hra = this.calculateHourAngle(a,d,l);
		
        return this.decimalToHour(dhuhrTime + hra * 4);

    },


    maghribTime: function (sunSet) {
        return this.decimalToHour(sunSet);
    },


    ishaTime: function (dhuhrTime, declination, latitude) {
        var a = this.getRadian(-9);
        var d = this.getRadian(declination);
        var l = this.calculateLatitude(latitude, declination);
		var hra = this.calculateHourAngle(a,d,l);
		
		return this.decimalToHour(dhuhrTime + hra * 4);
    },


    ishaEndTime: function (dhuhrTime, declination, latitude) {
        var a = this.getRadian(-18);
        var d = this.getRadian(declination);
        var l = this.calculateLatitude(latitude, declination);
		var hra = this.calculateHourAngle(a,d,l);
		
		return this.decimalToHour(dhuhrTime + hra * 4);
    },

    elevationAngle: function (latitude, declination, day) {

        var altitude = 0;
        //https://www.pveducation.org/pvcdrom/properties-of-sunlight/elevation-angle
        //α=90+φ−δ 
        if (day) {
            altitude = 90 + latitude - declination;
			if(altitude > 90)
				altitude = 180 - altitude;
        }
        else {
            //night			
            //day and night altitude differences is 2*declination
            altitude = 90 + latitude + declination;
			if(altitude > 90)
				altitude = altitude - 180;
        }
		
        return altitude;
    },
	
	declination: function(calculateDate){		
        var time  = this.calculateJulianCentury(calculateDate.getTime());
 		var e = this.getRadian(this.obliquityCorrected(time));
		var b = this.getRadian(this.sunApparentLongitude(time));
		var sint = Math.sin(e) * Math.sin(b);
		return this.getDegree(Math.asin(sint));
    },
	
	equationofTime : function(calculateDate){		
        var time  = this.calculateJulianCentury(calculateDate.getTime());
 	    var eps = this.getRadian(this.obliquityCorrected(time));
		var l0 = this.getRadian(this.sunGeometricMeanLongitude(time));
		var m = this.getRadian(this.sunGeometricMeanAnomaly(time));
		var e = this.eccentricityEarthOrbit(time);
		var y = Math.tan(eps / 2);
		y = y * y;
		var etime = y * Math.sin(2.0 * l0) - 2 * e * Math.sin(m) + 4 * e * y * Math.sin(m) * Math.cos(2.0 * l0)
				- 0.5 * y * y * Math.sin(4.0 * l0) - 1.25 * e * e * Math.sin(2.0 * m);
		return this.getDegree(etime) * 4.0;        
	},
	
	calculateLatitude : function(latitude, declination){
        //todo
		return this.getRadian(latitude);
	},
	
	calculateHourAngle : function(altitude, declination,latitude){
		var cosHRA = Math.acos((Math.sin(altitude) - Math.sin(declination) * Math.sin(latitude)) / (Math.cos(declination) * Math.cos(latitude)));
		return this.getDegree(cosHRA);		
	},

    decimalToHour: function (value) {
		if(isNaN(value))
			return "-";
        value = value / 60;
        var hour = Math.trunc(value);
        var remain = (value - hour) * 60;
        var minute = Math.trunc(remain);
        if (hour.toString().length == 1)
            hour = "0" + hour;
       
	   if (minute.toString().length == 1)
            minute = "0" + minute;
        
		return hour + ":" + minute;
    },

    getDegree: function (radianAngle) {
        return (180 * radianAngle / Math.PI);
    },

    getRadian: function (degreeAngle) {
        return (Math.PI * degreeAngle / 180);
    },

    formatDate: function (calculateDate) {
        var dd = calculateDate.getDate();
        var mm = calculateDate.getMonth() + 1; //January is 0!

        var yyyy = calculateDate.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return dd + '/' + mm + '/' + yyyy;
    },

     calculateSunDeclination: function(time) {
		var e = this.getRadian(this.obliquityCorrected(time));
		var b = this.getRadian(this.sunApparentLongitude(time));
		var sint = Math.sin(e) * Math.sin(b);
		var theta = Math.asin(sint);
		return this.getDegree(theta);
	},

	calculateEquationOfTime: function(time) {
		var eps = this.getRadian(this.obliquityCorrected(time));
		var l0 = this.getRadian(this.sunGeometricMeanLongitude(time));
		var m = this.getRadian(this.sunGeometricMeanAnomaly(time));
		var e = this.eccentricityEarthOrbit(time);
		var y = Math.tan(eps / 2);
		y *= y;
		var sin2l0 = Math.sin(2.0 * l0);
		var cos2l0 = Math.cos(2.0 * l0);
		var sin4l0 = Math.sin(4.0 * l0);
		var sin1m = Math.sin(m);
		var sin2m = Math.sin(2.0 * m);
		var etime = y * sin2l0 - 2 * e * sin1m + 4 * e * y * sin1m * cos2l0
				- 0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;
		return this.getDegree(etime) * 4.0;
	},

	calculateJulianCentury:  function(time) {
		var JULIAN_DAY_1970 = 2440587.5; // 2451544.5-10957;
		var MILLIS_IN_DAY = 1000 * 60 * 60 * 24;
		return ((time / MILLIS_IN_DAY) + JULIAN_DAY_1970 - 2451545) / 36525;
	},

	obliquityCorrected: function(time) {
		var e0 = this.meanObliquityOfEcliptic(time);
		var omega = this.getRadian(125.04 - 1934.136 * time);
		return e0 + 0.00256 * Math.cos(omega);
	},

	meanObliquityOfEcliptic: function(time) {
		var seconds = 21.448 - time * (46.8150 + time * (0.00059 - time * (0.001813)));
		return 23.0 + (26.0 + (seconds / 60.0)) / 60.0;
	},

	sunGeometricMeanAnomaly: function (time) {
		return 357.52911 + time * (35999.05029 - 0.0001537 * time);
	},

	sunEquationOfCenter: function(time) {
		var meanAnomaly = this.getRadian(this.sunGeometricMeanAnomaly(time));
		return Math.sin(1 * meanAnomaly) * (1.914602 - time * (0.004817 + 0.000014 * time))
				+ Math.sin(2 * meanAnomaly) * (0.019993 - time * (0.000101))
				+ Math.sin(3 * meanAnomaly) * (0.000289);
	},

	sunGeometricMeanLongitude: function(time) {
		var L0 = 280.46646 + time * (36000.76983 + 0.0003032 * time);
		return L0 - 360 * Math.floor(L0 / 360);
	},

	sunTrueLongitude: function(time) {
		return this.sunGeometricMeanLongitude(time) + this.sunEquationOfCenter(time);
	},
    sunApparentLongitude: function(time) {
		var omega = this.getRadian(125.04 - 1934.136 * time);
		return this.sunTrueLongitude(time) - 0.00569 - 0.00478 * Math.sin(omega);
	},

	eccentricityEarthOrbit: function(time) {
		return 0.016708634 - time * (0.000042037 + 0.0000001267 * time);
	}
	
};

var UserLocation =
{
    //default value is istanbul
    latitude: 41.005,
    longitude: 28.9,

    getLocation: function (callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                UserLocation.latitude = position.coords.latitude;
                UserLocation.longitude = position.coords.longitude;
                console.log("lat long", UserLocation.latitude, UserLocation.longitude);
                if (callback) {
                    callback();
                }
            },
            function (error) {
                console.log("no permission");
                if (callback) {
                    callback();
                }
            });
        }
        else {
            console.log("Geolocation is not supported by this browser.");
            if (callback) {
                callback();
            }
        }
    }
}
