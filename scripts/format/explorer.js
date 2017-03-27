const knownAddresses = {
          '_miner_0x3347da801dfeca62e7d327ad9286726083797a4e' : 'PoolTo.Be',
          '_miner_0x41a6d4370e4aebdca59c1c2b0c20dfe5264314ca' : 'Minerpool.cc',
          '_miner_0x8eb92319c431f72df6182d150bb87887aeef2a7a' : 'Pool Sexy',
          '_miner_0x8429ab69b8721ffb29f2e66fdf06b1c65d66eb58' : 'UBIQPool',
          '_miner_0x9ad0e9f488da8b2b0b6b6899570e7680ca07f65f' : 'AikaPool',
          '_miner_0xd5bcc99b340504f670e47a04580c1e0cc7678d58' : 'CoinMiners',
          '_miner_0x78319cfed4eb7d881217646b2122f93880be0823' : 'Miners-Zone',
          '_miner_0x63206593772f90358c7eea84f28cb29963675386' : 'Mole-Pool',
          '_miner_0x5eaba45c3962d1522d9ccb2200f0cb6e45e7bf99' : 'Suprnova',
          '_miner_0x597fb7611180f9ac5dfdffcab69a8ad7063c91c2' : 'PoolCoin.biz',
	      '_miner_0xb3c4e9ca7c12a6277deb9eef2dece65953d1c864' : 'Bittrex',
	      '_miner_0xafda64d9e03deb48698b6914bf13225ee95900c6' : 'UBIQ.cc',
          '_miner_0xd144e30a0571aaf0d0c050070ac435deba461fab' : 'clona.ru'
};

var hashRateUnits = ['H', 'KH', 'MH', 'GH', 'TH', 'PH'];

function stoFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}

angular.module('Explorer').filter('payment', function() {
    return function(input) {
        input = input || 0;
        var out = input/1000000000;
        return out;
    };
}); 

angular.module('Explorer').filter('fromWei', function() {
    return function(input) {
        input = input || 0;
        var out = stoFixed(input/1000000000000000000);
        return out;
    };
}); 

angular.module('Explorer').filter('fromWeiFixed', function() {
    return function(input) {
        input = input || 0;

        var out = stoFixed(input/1000000000000000000);
        return out;
    };
});

angular.module('Explorer').filter('toWei', function() {
    return function(input) {
        input = input || 0;
        var out = input * 1000000000000000000;
        return out;
    };
});
angular.module('Explorer').filter('truncate', function() {
    return function(input, max) {
        input = input || "";
        var out;
        if(input.length > max)
        {
            out = input.substring(0, max/2-2) + '....' + input.substring(input.length-(max/2-2), input.length);
        }
        return out;
    };
});

angular.module('Explorer').filter('knownMiners', function() {
    return function(input, max) {
        if(input) {
            var out;
            if(knownAddresses["_miner_"+input] != undefined) {
                out = knownAddresses["_miner_"+input];
            }
            if(out == "" || out == undefined) {
                out = input;
            }
            if(out.length > max) {
                if(max == 0 && out.length == 42)
                    out = "";
                if(max > 0)
                    out = input.substring(0, max/2-2) + '....' + input.substring(input.length-(max/2-2), input.length);
            }

            return out;
        }
        else {
            return "";
        }
    };
});

angular.module('Explorer').filter('secondstoms', function() {
	return function(input) {
		if(input) {
			var out = input;
			return out * 1000;
		}
		else
		{
			return "";
		}
	};
});

angular.module('Explorer').filter('relativetime', function() {
	return function(input) {
		return moment(input*1000).fromNow();
	};
});

angular.module('Explorer').filter('reward', function() {
	return function(input) {
		return parseFloat(input).toFixed(6);
	};
});

angular.module('Explorer').filter('hashrate', function() {
	return function(hashrate) {
		var unit = 0;
		if(!hashrate)
			hashrate = 0;
		while (hashrate > 1000) {
		    hashrate = hashrate / 1000;
		    unit++;
		}
  		return hashrate.toFixed(2) + ' ' + hashRateUnits[unit];
	};
});

angular.module('Explorer').filter('orderObjectBy', function(){
	return function(items, field, reverse) {
	    var filtered = [];
	    angular.forEach(items, function(v,k) {
	      v['key']=k;
	      filtered.push(v);
	    });
	    filtered.sort(function (a, b) {
	      return (a[field] > b[field] ? 1 : -1);
	    });
	    if(reverse) filtered.reverse();
	    return filtered;
	  };
});

angular.module('Explorer').filter('variance', function() {
	return function(input) {
		if(input == undefined)
			return '0%';
		return parseInt(input)+'%';
	};
});

angular.module('Explorer').filter('hextoascii', function() {
	return function(input) {
		if(input === undefined)
			return "";
		var hex = input.toString();
		var str = '';
		for (var i = 0; i < hex.length; i += 2)
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		return str;
	};
});

angular.module('Explorer').filter('utf8Decode', function() {
	return function(input) {
		if(input === undefined)
			return "";
		var decoded = decodeURIComponent(escape(input));
		return decoded;
	}
});

angular.module('Explorer').filter('toUSD', function($rootScope) {
	return function(input) {
		if(input === undefined)
			return ""
		var usd = parseFloat(($rootScope.btc*$rootScope.usd)*input).toFixed(2);
		return usd;
	}
});

angular.module('Explorer').filter('toBTC', function($rootScope) {
	return function(input) {
		if(input === undefined)
			return ""
		var btc = parseFloat(input*$rootScope.btc).toFixed(8);
		return btc;
	}
});