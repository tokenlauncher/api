// Generated by LiveScript 1.5.0
(function(){
  var ref$, get, post, presaleAbi, tokenAbi, getProjectsBuilder, getProjectDetailsBuilder, addProjectBuilder, tokensaleContract, tokenContract, factory;
  ref$ = require('superagent'), get = ref$.get, post = ref$.post;
  presaleAbi = require('./ProdPrivateSale.abi.json');
  tokenAbi = require('./ProdToken.abi.json');
  getProjectsBuilder = function(url){
    return function(cb){
      return get(url + "/api/projects").timeout({
        deadline: 3000
      }).end(function(err, data){
        if (err != null) {
          return cb(err);
        }
        return cb(null, JSON.parse(data.text));
      });
    };
  };
  getProjectDetailsBuilder = function(url){
    return function(token, cb){
      return get(url + "/api/project/" + token).timeout({
        deadline: 3000
      }).end(function(err, data){
        if (err != null) {
          return cb(err);
        }
        return cb(null, JSON.parse(data.text));
      });
    };
  };
  addProjectBuilder = curry$(function(url, model, cb){
    return post(url + "/api/add", model).timeout({
      deadline: 3000
    }).end(function(err, data){
      var ref$;
      if (err != null) {
        return cb((ref$ = data != null ? data.text : void 8) != null ? ref$ : err);
      }
      return cb(null, JSON.parse(data.text));
    });
  });
  tokensaleContract = curry$(function(web3, address){
    var Contract;
    Contract = web3.eth.contract(presaleAbi);
    return Contract.at(address);
  });
  tokenContract = curry$(function(web3, address){
    var Contract;
    Contract = web3.eth.contract(tokenAbi);
    return Contract.at(address);
  });
  factory = function(web3, url){
    var tokensaleContractAt, tokenContractAt, getProjects, getProjectDetails, addProject;
    tokensaleContractAt = tokensaleContract(web3);
    tokenContractAt = tokenContract(web3);
    getProjects = getProjectsBuilder(url);
    getProjectDetails = getProjectDetailsBuilder(url);
    addProject = addProjectBuilder(url);
    return {
      addProject: addProject,
      getProjects: getProjects,
      getProjectDetails: getProjectDetails,
      tokensaleContractAt: tokensaleContractAt,
      tokenContractAt: tokenContractAt
    };
  };
  module.exports = factory;
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
}).call(this);
