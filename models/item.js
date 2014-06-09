var mongoose = require('mongoose'),
	stringHelper = require('string-helper'),
    Schema = mongoose.Schema;

var Item = new Schema({
	name: {
		type: String,
		maxlength: 50
	},
	alias: {
		type: String
	},
	description: String,
	image_url: {
		type: String,
		maxlength: 255,
		default: ""
	},
	total_price: {
		type: Number,
		default: 0
	},
	recipe_price: {
		type: Number,
		default: 0
	},
	recipe: Array
});

Item.statics.getAll = function() {
	return this.find({}).exec();
};

Item.path('name').validate(function(value){
	return !!value.trim().length;
}, '[Tên trang bị] Không được để trống');

Item.path('total_price').validate(function(value){
	return typeof value === "number";
}, '[Tổng giá] Yêu cầu nhập số');

Item.path('recipe_price').validate(function(value){
	return typeof value === "number";
}, '[Giá công thức] Yêu cầu nhập số');

Item.pre('save', function(next){
	this.alias = stringHelper.slugify(this.name);
	next();
});

var ItemModel = mongoose.model('Item', Item);
module.exports = ItemModel;