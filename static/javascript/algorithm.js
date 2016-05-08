function getH_t(month,H,lng,dip,az){
	var n = [15, 45, 74, 105, 135, 166, 197, 227, 258, 289, 319, 349];
	//需要month,H,lng,dip,az
	var lng, dip, az;     //纬度，倾角，方位角

	function toRadian(degree){
		return degree * 0.017453293;
	};

	function getDeclination(month){        //计算太阳赤纬角
		return 23.45*Math.sin(360/(365*(284 + n[month-1])));
	};

	var sin = function(degree){
		return Math.sin(toRadian(degree));
	};
	var cos = function(degree){
		return Math.cos(toRadian(degree));
	};
	var tan = function(degree){
		return Math.tan(toRadian(degree));
	};

	var sin_lng = sin(lng);
	var cos_lng = cos(lng);
	var tan_lng = tan(lng);

	var sin_dip = sin(dip);
	var cos_dip = cos(dip);
	var tan_dip = tan(dip);

	var sin_az = sin(az);
	var cos_az = cos(az);
	var tan_az = tan(az);

	var sin_dec = sin(getDeclination(month));
	var cos_dec = cos(getDeclination(month));
	var tan_dec = tan(getDeclination(month));

	var a = (sin_lng * cos_dip - sin_dip*cos_lng*cos_az) * sin_dec;
	var b = (cos_lng * cos_dip + sin_dip*sin_lng*cos_az) * cos_dec;
	var c = cos_dec * sin_dip * sin_az;
	var D = Math.sqrt(c*c + b*b);

	var w_s = 1/cos(-tan_lng * tan_dec);
	var w_ss = Math.min(w_s, ( 1/(Math.cos(-a/D)) + 1/(Math.sin(c/D)) ));
	var w_sr = -Math.min(w_s, Math.abs( -1/(Math.cos(-a/D)) + 1/(Math.sin(c/D)) ));

	var Gsc = 1367;

	var H_0 = 24*3600*Gsc*(1 + 0.033*Math.cos(360*n[month-1]/365))*(cos_lng*cos_dec*Math.sin(w_s) + Math.PI*w_s/180*sin_lng*sin_dec)/Math.PI;
	var Kt = H/H_0;

	function getH_d(){
		if(Kt < 0.22){
			return H*(1.00 - 1.13*Kt);
		}else if(Kt > 0.8){
			return H*(1.390 - 4.027*Kt + 5.532*Kt*Kt - 3.108*Kt*Kt*Kt);
		}else{
			if(w_s <= 81.4){
				return H*(1.391 - 3.56*Kt + 4.189*Kt*Kt - 2.137*Kt*Kt*Kt);
			}else{
				return H*(1.311 - 3.022*Kt + 3.427*Kt*Kt - 1.821*Kt*Kt*Kt);
			}
		}
	};
	var H_d = getH_d();
	var H_b = H - H_d;

	var R_b = ((cos_lng*cos_dip + sin_dip*sin_lng*cos_az)*cos_dec*(Math.sin(w_ss) - Math.sin(w_sr)) + 
		Math.PI/180*(w_ss - w_sr)*(sin_lng*cos_dip - sin_dip*cos_lng*cos_az)*sin_dec + 
		(Math.cos(w_ss) - Math.cos(w_sr))*cos_dec*sin_dip*sin_az) / (2*(cos_lng*cos_dec*Math.sin(w_s) + (Math.PI/180*w_s*sin_lng*sin_dec)));

	var H_t = H_b*R_b + H_d*( R_b*H_b/H_0 + 1/2*(1-H_b/H_0)*(1 + cos_dip)) + 1/2*0.2*H*(1 - cos_dip);
	return H_t;
}            

for(var i = 0; i <= 90; i++){
	console.log(getH_t(6, 4058, 31, i, 2));
}
