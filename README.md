# Pray time calculation
Pray time calculation is based on trigonometry and trigonometric formulas below. The hour angle and elevation angle are key point. Fajr, Tulu and Maghrib time is calculate with these two parameter. For tulu time hour angle is 180 and elevation angle is highest value. For Fajr and Maghrib elevation angle is zero.
	
    ω = the hour angle;
    α = the altitude angle;
    δ = the declination angle;
    φ = observer’s latitude.

    sinα = sinδ * sin φ + cosδ * cos ω * cos φ 
    cos ω = (sinα - sinδ * sin φ) / (cosδ * cos φ)  


# Dawn Time:

Dawn time calculate by set the elevation angle is -18 degree. It is also known as astronomical twilight. And then the tulu time is subtracted from the calculated time.


	α = -18;
    cos ω = (sinα - sinδ * sin φ) / (cosδ * cos φ)  
	dawnTime =  tuluTime -  acos(ω) * 4


# Fajr Begin Time:

Fajr begin time calculate by set the elevation angle is -9 degree.  And then the tulu time is subtracted from the calculated time.

	α = -9;
    cos ω = (sinα - sinδ * sin φ) / (cosδ * cos φ)  
	fajrBeginTime =  tuluTime -  acos(ω) * 4


# Fajr End Time:

Fajr end time have to calculate by set the elevation angle is zero degree. But complete disappearance of the sun is achieved with -1 degrees. In order to find fajr end time, tulu time is subtracted from the calculated time.

	α = -1;
    cos ω = (sinα - sinδ * sin φ) / (cosδ * cos φ)  
	fajrEndTime =  tuluTime -  acos(ω) * 4

# Tulu Time:
Solar noon for a given location is found from the longitude (in degrees, positive to the east of the Prime Meridian) and the equation of time (in minutes):

snoon = 720 – 4*longitude – eqtime

# Equation Time Calculation

The Equation Time Calculation can be approximated by the following formula:

	EoT = 9.87 * sin (2B) - 7.53 * cos (B) - 1.5 * sin (B)
	B = 360 * (N - 81) / 365
	N = day number, January 1 = day 1
  

# Asr Time

Asr time is in the middle of noon and maghrib. And to find asr time, tulu time is summed with calculated time.
	
	α = -1;
    cos ω = (sinα - sinδ * sin φ) / (cosδ * cos φ)  
	asrTime =  tuluTime +  acos(ω) / 2 * 4	 

# Maghrib Time:

Maghrib time calculate by set the elevation angle is zero degree. But complete disappearance of the sun is achieved with -1 degrees. In order to find maghrib time, tulu time is summed with calculated time.

	α = -1;
    cos ω = (sinα - sinδ * sin φ) / (cosδ * cos φ)  
	asrTime =  tuluTime +  acos(ω) * 4
	 

# Isha Time:

Isha time calculate by set the elevation angle is -9 degree.   And then tulu time is summed with calculated time.

	α = -9;
    cos ω = (sinα - sinδ * sin φ) / (cosδ * cos φ)  
	ishaTime =  tuluTime +  acos(ω) * 4

# Isha End Time:

Isha end  time calculate by set the elevation angle is -18 degree. It is also known as astronomical twilight.  And then tulu time is summed with calculated time.

	α = -18;
    cos ω = (sinα - sinδ * sin φ) / (cosδ * cos φ)  
	ishaTime =  tuluTime +  acos(ω) * 4
	 
	
# Elevation Angle

The elevation angle is the angular height of the sun in the sky measured from the horizontal.     

The elevation, α, can be found using the following formula at any time:

    ω = the hour angle;
	α = the altitude angle;
    δ = the declination angle;
    φ = observer’s latitude.

    sinα = sinδ * sin φ + cosδ * cos ω * cos φ 

	for solar noon :

    if ω = the hour angle is 180;

    sinα = sinδ * sin φ  - cosδ *  cos φ 

	 
	if cos(X + Y) = cosX cosY - sinX sinY

    cos(φ + δ)  = -1* (cos φ * cosδ  - sin φ * sinδ)  
	
	sinα =  -1 * cos(φ + δ)
	
	cos(90 - α) =  -1 * cos(φ + δ)

	α=90+φ−δ 
	

# References:

Trigonommy  	:	https://www.analyzemath.com/trigonometry/trigonometric_formulas.html

Elevation Angle :	https://www.pveducation.org/pvcdrom/properties-of-sunlight/elevation-angle

Solar Noon 		:	https://www.esrl.noaa.gov/gmd/grad/solcalc/solareqns.PDF

Equation Of Time:	https://www.pveducation.org/pvcdrom/properties-of-sunlight/solar-time

Declination		:  https://www.pveducation.org/pvcdrom/properties-of-sunlight/declination-angle
