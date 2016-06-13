var m = {};
var _ = require('lodash');
var utils = require('../utils');

m.publish = function(msg, qName, callback) { 
	if(typeof qName == 'function'){callback = qName; qName=null;}
	if(!callback) callback = _.noop;
	qName = qName || this.options.defQ;
	msg = utils.stringify(msg);
	this.getChanel(qName, function publishMsg(err, chanel){
		if(err) return callback(err);
		chanel.sendToQueue(qName, new Buffer(msg));
		callback(null, true);
	})	
};

module.exports = m;