const models = require('../model');

/**
 * Default error message
 */
const invalid_model_msg = 'Model is invalid';

/**
 * Data validator
 */
const _ = {
    isString: function isString(v) {
        return Object.prototype.toString.call(v) === '[object String]';
    },
    isFunction: function isString(v) {
        return Object.prototype.toString.call(v) === '[object Function]';
    },
    isUndefined: function isString(v) {
        return Object.prototype.toString.call(v) === '[object Undefined]';
    }
};

function lwr(v) {
    if (_.isString(v)) { return v.toLowerCase() }
    return v;
}

function validModel(modelname) {
    const _modelname = lwr(modelname);
    if (models[_modelname]) {
        return { f: true, r: _modelname };
    }
    return { f: false, r: modelname };
}

function Mongo() {
    this.modelName = null;
    this.lean = true;
};

Mongo.prototype.Model = function Model(modelName) {
    const _modelVal = validModel(modelName);
    this.modelName = _modelVal.r;
    if (_modelVal.f) {
        this.model = models[this.modelName];
        return this
    }
    throw new Error(invalid_model_msg);
};

Mongo.prototype.Schema = function Schema(modelName) {
    const _modelVal = validModel(modelName);
    modelName = _modelVal.r;
    if (_modelVal.f) {
        return models[modelName];
    }
    return new Error(invalid_model_msg);
};

Mongo.prototype.insert = function Insert(c, cb) {
    const model = this.model(c);
    if (_.isFunction(cb)) {
        return model.save(c, (er, resp) => {
            if (er) {
                return cb(er);
            }
            return cb(null, resp);
        })
    }
    return model.save(c);
}

Mongo.prototype.update = function Update(c, d, o, cb) {
    cb = _.isFunction(o) ? o : cb;
    o = (_.isFunction(o) || _.isUndefined(o)) ? {} : o;
    if (_.isFunction(cb)) {
        return this.model.update(c, d, o, cb);
    }
    return this.model.update(c, d, o);
}

Mongo.prototype.updateOne = function UpdateOne(c, d, o, cb) {
    cb = _.isFunction(o) ? o : cb;
    o = (_.isFunction(o) || _.isUndefined(o)) ? {} : o;
    if (_.isFunction(cb)) {
        return this.model.updateOne(c, d, o, cb);
    }
    return this.model.updateOne(c, d, o);
}

Mongo.prototype.findOneAndUpdate = function FindOneAndUpdate(c, d, o, cb) {
    cb = _.isFunction(o) ? o : cb;
    o = (_.isFunction(o) || _.isUndefined(o)) ? {} : o;
    if (_.isFunction(cb)) {
        return this.model.findOneAndUpdate(c, d, o, cb);
    }
    return this.model.findOneAndUpdate(c, d, o);
}

Mongo.prototype.findOne = function FindOne(c, p, o, cb) {
    cb = _.isFunction(p) ? p : (_.isFunction(o) ? o : cb);
    o = (_.isFunction(o) || _.isUndefined(o)) ? {} : o;
    p = (_.isFunction(p) || _.isUndefined(p)) ? {} : p;
    o.lean = this.lean;
    if (_.isFunction(cb)) {
        return this.model.findOne(c, p, o, cb);
    }
    return this.model.findOne(c, p, o);
}

Mongo.prototype.find = function Find(c, p, o, cb) {
    cb = _.isFunction(p) ? p : (_.isFunction(o) ? o : cb);
    o = (_.isFunction(o) || _.isUndefined(o)) ? {} : o;
    p = (_.isFunction(p) || _.isUndefined(p)) ? {} : p;
    o.lean = this.lean;
    if (_.isFunction(cb)) {
        return this.model.find(c, p, o, cb);
    }
    return this.model.find(c, p, o);
}

Mongo.prototype.findByIdAndRemove = function FindByIdAndRemove(c, cb) {
    if (_.isFunction(cb)) {
        return this.model.findByIdAndRemove(c, cb);
    }
    return this.model.findByIdAndRemove(c);
}

Mongo.prototype.remove = function Remove(c, cb) {
    if (_.isFunction(cb)) {
        return this.model.remove(c, cb);
    }
    return this.model.remove(c);
}

Mongo.prototype.delete = function Delete(c, o, cb) {
    cb = _.isFunction(o) ? o : cb;
    o = (_.isFunction(o) || _.isUndefined(o)) ? {} : o;
    if (_.isFunction(cb)) {
        return this.model.update(c, { act: false }, o, cb);
    }
    return this.model.update(c, { act: false }, o);
}

Mongo.prototype.aggregation = function Aggregation(q, cb) {
    if (_.isFunction(cb)) {
        return this.model.aggregate([q], cb);
    }
    return this.model.aggregate([q]);
}

Mongo.prototype.count = function Count(q, cb) {
    cb = _.isFunction(q) ? q : cb;
    q = (_.isFunction(q) || _.isUndefined(q)) ? {} : q;
    if (_.isFunction(cb)) {
        return this.model.countDocuments(q, cb);
    }
    return this.model.countDocuments(q);
}

const mongo = new Mongo();

exports.Schema = function Schema(modelName) {
    return mongo.Schema(modelName);
}
exports.Model = function Model(modelName) {
    return mongo.Model(modelName);
}
exports.default = mongo;