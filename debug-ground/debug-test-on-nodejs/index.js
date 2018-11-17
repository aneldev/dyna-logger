/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "d05ef2397e71db01dd54";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/DynaLogger.ts":
/*!***************************!*\
  !*** ./src/DynaLogger.ts ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(/*! dyna-universal */ "dyna-universal");

var universal = dynaUniversal.universal;
var ELogType;

(function (ELogType) {
  ELogType["LOG"] = "LOG";
  ELogType["INFO"] = "INFO";
  ELogType["ERROR"] = "ERROR";
  ELogType["WARN"] = "WARN";
  ELogType["DEBUG"] = "DEBUG";
})(ELogType = exports.ELogType || (exports.ELogType = {}));

var DynaLogger =
/** @class */
function () {
  function DynaLogger(config) {
    if (config === void 0) {
      config = {};
    }

    this._config = {
      bufferLimit: 5000,
      consoleLogs: true,
      consoleInfoLogs: true,
      consoleErrorLogs: true,
      consoleWarnLogs: true,
      consoleDebugLogs: true,
      consoleLogType: true,
      consoleTimestamp: true,
      keepLogs: true,
      keepInfoLogs: true,
      keepErrorLogs: true,
      keepWarnLogs: true,
      keepDebugLogs: true,
      replaceGlobalLogMethods: false,
      onLog: function (log) {
        return undefined;
      }
    };
    this._logs = [];
    this._realConsole = __assign({}, universal.console);
    this.setConfig(config);

    if (this._config.replaceGlobalLogMethods) {
      this._replaceGlobalLog();
    }
  }

  DynaLogger.prototype.setConfig = function (config) {
    if (config === void 0) {
      config = {};
    }

    this._config = __assign({}, this._config, config);
  };

  DynaLogger.prototype.destroy = function () {
    if (this._config.replaceGlobalLogMethods) {
      this._restoreGlobalLog();
    }
  };

  DynaLogger.prototype._replaceGlobalLog = function () {
    var _this = this;

    universal.console.log = function () {
      var params = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
      }

      return _this._log(ELogType.LOG, null, params, params, false);
    };

    universal.console.info = function () {
      var params = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
      }

      return _this._log(ELogType.INFO, null, params, params, false);
    };

    universal.console.error = function () {
      var params = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
      }

      return _this._log(ELogType.ERROR, null, params, params, false);
    };

    universal.console.warn = function () {
      var params = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
      }

      return _this._log(ELogType.WARN, null, params, params, false);
    };

    universal.console.debug = function () {
      var params = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
      }

      return _this._log(ELogType.DEBUG, null, params, params, false);
    };
  };

  DynaLogger.prototype._restoreGlobalLog = function () {
    universal.console.log = this._realConsole.log;
    universal.console.info = this._realConsole.info;
    universal.console.debug = this._realConsole.debug;
    universal.console.error = this._realConsole.error;
    universal.console.warn = this._realConsole.warn;
  };

  Object.defineProperty(DynaLogger.prototype, "logs", {
    get: function () {
      return [].concat(this._logs);
    },
    enumerable: true,
    configurable: true
  });

  DynaLogger.prototype.log = function (section, message, data) {
    if (data === void 0) {
      data = null;
    }

    this._log(ELogType.LOG, section, message, data);
  };

  DynaLogger.prototype.info = function (section, message, data) {
    if (data === void 0) {
      data = null;
    }

    this._log(ELogType.INFO, section, message, data);
  };

  DynaLogger.prototype.error = function (section, message, data) {
    if (data === void 0) {
      data = null;
    }

    this._log(ELogType.ERROR, section, message, data);
  };

  DynaLogger.prototype.warn = function (section, message, data) {
    if (data === void 0) {
      data = null;
    }

    this._log(ELogType.WARN, section, message, data);
  };

  DynaLogger.prototype.debug = function (section, message, data) {
    if (data === void 0) {
      data = null;
    }

    this._log(ELogType.DEBUG, section, message, data);
  };

  DynaLogger.prototype.clear = function (type) {
    if (type) this._logs = this.logs.filter(function (log) {
      return log.type !== type;
    });else this._logs = [];
  };

  DynaLogger.prototype._log = function (type, section, text_, data, consoleTheData) {
    if (text_ === void 0) {
      text_ = '';
    }

    if (consoleTheData === void 0) {
      consoleTheData = true;
    }

    var _a, _b, _c, _d, _e;

    var consoleOutput = [];
    var now = new Date();
    var userText;
    if (Array.isArray(text_)) userText = text_;else userText = [text_];
    if (this._config.consoleLogType) consoleOutput.push(type);
    if (section) consoleOutput.push(section);
    if (this._config.consoleTimestamp) consoleOutput.push(now.toLocaleString());
    consoleOutput = consoleOutput.concat(userText);
    var log = {
      date: now,
      type: type,
      text: this._stringifyConsoleParams(consoleOutput),
      data: data
    };
    if (data && consoleTheData) consoleOutput.push(data); // add to _logs

    if (type == ELogType.LOG && this._config.keepLogs) this._logs.push(log);
    if (type == ELogType.INFO && this._config.keepInfoLogs) this._logs.push(log);
    if (type == ELogType.ERROR && this._config.keepErrorLogs) this._logs.push(log);
    if (type == ELogType.WARN && this._config.keepWarnLogs) this._logs.push(log);
    if (type == ELogType.DEBUG && this._config.keepDebugLogs) this._logs.push(log); // console it

    if (type == ELogType.LOG && this._config.consoleLogs && this._realConsole.log) (_a = this._realConsole).log.apply(_a, consoleOutput);
    if (type == ELogType.INFO && this._config.consoleInfoLogs && this._realConsole.info) (_b = this._realConsole).info.apply(_b, consoleOutput);
    if (type == ELogType.ERROR && this._config.consoleErrorLogs && this._realConsole.error) (_c = this._realConsole).error.apply(_c, consoleOutput);
    if (type == ELogType.WARN && this._config.consoleWarnLogs && this._realConsole.warn) (_d = this._realConsole).warn.apply(_d, consoleOutput);
    if (type == ELogType.DEBUG && this._config.consoleDebugLogs && this._realConsole.debug) (_e = this._realConsole).debug.apply(_e, consoleOutput); // keep the bufferLimit

    if (this._config.bufferLimit > -1) {
      // clean up
      while (this._logs.length > this._config.bufferLimit) this._logs.shift(); // set the older with a proper message


      if (this._config.bufferLimit > 0 && this._logs.length === this._config.bufferLimit) {
        this._logs[0] = {
          date: this._logs[0].date,
          type: ELogType.WARN,
          text: "--- previous logs deleted due to bufferLimit: " + this._config.bufferLimit,
          data: {
            config: this._config
          }
        };
      }
    }

    this._config.onLog(log);
  };

  DynaLogger.prototype._stringifyConsoleParams = function (params) {
    return params.reduce(function (acc, value) {
      if (acc.length) acc += " ";
      if (typeof value === "string") acc += value;else acc += String(value);
      return acc;
    }, '');
  };

  return DynaLogger;
}();

exports.DynaLogger = DynaLogger;

/***/ }),

/***/ "./src/node.ts":
/*!*********************!*\
  !*** ./src/node.ts ***!
  \*********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(__webpack_require__(/*! ./DynaLogger */ "./src/DynaLogger.ts"));

/***/ }),

/***/ "./tests/index.ts":
/*!************************!*\
  !*** ./tests/index.ts ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(/*! ./utils/mock-jest */ "./tests/utils/mock-jest.js");

__webpack_require__(/*! ./scripts/main.test */ "./tests/scripts/main.test.ts");

/***/ }),

/***/ "./tests/scripts/main.test.ts":
/*!************************************!*\
  !*** ./tests/scripts/main.test.ts ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var node_1 = __webpack_require__(/*! ../../src/node */ "./src/node.ts");

if (typeof jasmine !== 'undefined') jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
describe('Dyna logger i/o test', function () {
  var collectedLogs = [];
  var logger = new node_1.DynaLogger({
    bufferLimit: 200,
    onLog: function (log) {
      return collectedLogs.push(log);
    }
  });
  it('should log', function () {
    logger.log('test', 'message1', {
      test: 1
    });
    expect(logger.logs.length).toBe(collectedLogs.length);
  });
  it('should info log', function () {
    logger.info('test', 'message1', {
      test: 1
    });
    expect(logger.logs.length).toBe(collectedLogs.length);
  });
  it('should error log', function () {
    logger.error('test', 'message1', {
      test: 1
    });
    expect(logger.logs.length).toBe(collectedLogs.length);
  });
  it('should warn log', function () {
    logger.warn('test', 'message1', {
      test: 1
    });
    expect(logger.logs.length).toBe(collectedLogs.length);
  });
  it('should debug log', function () {
    logger.debug('test', 'message1', {
      test: 1
    });
    expect(logger.logs.length).toBe(collectedLogs.length);
  });
});
describe('Dyna logger, clear method test', function () {
  var logger = new node_1.DynaLogger({
    bufferLimit: 200
  });
  it('should add', function () {
    logger.log('test', 'message1', {
      test: 1
    });
    logger.info('test', 'message1', {
      test: 1
    });
    logger.error('test', 'message1', {
      test: 1
    });
    logger.warn('test', 'message1', {
      test: 1
    });
    logger.debug('test', 'message1', {
      test: 1
    });
    expect(logger.logs.length).toBe(5);
  });
  it('should clear logs only', function () {
    logger.clear(node_1.ELogType.LOG);
    expect(logger.logs.length).toBe(4);
  });
  it('should clear infos only', function () {
    logger.clear(node_1.ELogType.INFO);
    expect(logger.logs.length).toBe(3);
  });
  it('should clear errors only', function () {
    logger.clear(node_1.ELogType.ERROR);
    expect(logger.logs.length).toBe(2);
  });
  it('should clear warns only', function () {
    logger.clear(node_1.ELogType.WARN);
    expect(logger.logs.length).toBe(1);
  });
  it('should clear debugs only', function () {
    logger.log('test', 'message1', {
      test: 1
    });
    logger.clear(node_1.ELogType.DEBUG);
    expect(logger.logs.length).toBe(1);
  });
});
describe('Dyna logger, replace native console', function () {
  var logger;
  var realConsoleLogMethod;
  it('save the console method reference', function () {
    realConsoleLogMethod = console.log;
  });
  it('should load the logger', function () {
    logger = new node_1.DynaLogger({
      bufferLimit: -1,
      replaceGlobalLogMethods: true
    });
    expect(!!logger).toBe(true);
  });
  it('should global console different', function () {
    expect(realConsoleLogMethod).not.toBe(console.log);
  });
  it('should destroy logger', function () {
    logger.destroy();
  });
  it('should restore the global console method', function () {
    expect(realConsoleLogMethod).toBe(console.log);
  });
});

/***/ }),

/***/ "./tests/utils/mock-jest.js":
/*!**********************************!*\
  !*** ./tests/utils/mock-jest.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// Dev node: Come on!!! this is super ugly...
// If you find a stable way to debug the jest tests please fork me!
// As documented here: https://facebook.github.io/jest/docs/troubleshooting.html is not working as far of May/17
if (typeof global === 'undefined' && typeof window !== 'undefined') global = window;
let HIDE_SUCCESS_VALIDATION = false; // init section

global._mockJest = null;

global.clearTest = () => {
  global._mockJest = {
    errors: 0,
    passed: 0,
    descriptions: []
  };
};

global.clearTest();

global.describe = (description, cbDefineIts) => {
  global._mockJest.descriptions.push({
    description,
    its: []
  });

  cbDefineIts();
  startTests();
};

global.describe.skip = () => undefined;

global.it = (description, cbTest) => {
  global._mockJest.descriptions[global._mockJest.descriptions.length - 1].its.push({
    description,
    cbTest
  });

  startTests();
};

global.it.skip = () => undefined;

global.expect = expectValue => {
  return comparisons(expectValue);
}; // start and functions section


let comparisons = (expectValue, not = false) => {
  return {
    get not() {
      return comparisons(expectValue, true);
    },

    toBe: toBeValue => {
      let result = expectValue === toBeValue;
      if (not) result = !result;

      if (result) {
        if (!HIDE_SUCCESS_VALIDATION) console.log(`        Success, equal value [${expectValue} === ${toBeValue}]`);
        global._mockJest.passed++;
      } else {
        console.log(`        FAILED, expected [${toBeValue}] but received [${expectValue}]`);
        global._mockJest.errors++;
      }
    }
  };
};

let startTimer = null;

function startTests() {
  if (startTimer) clearTimeout(startTimer);
  startTimer = setTimeout(executeTests, 100);
}

function executeTests() {
  let descriptions = [].concat(global._mockJest.descriptions);

  const processTheNextDescription = () => {
    let description = descriptions.shift();

    if (description) {
      executeADescription(description, () => {
        processTheNextDescription();
      });
    } else {
      finished();
    }
  }; // start


  processTheNextDescription();
}

function executeADescription(description, cbCompleted) {
  console.log('Description::: Start:', description.description);
  let its = [].concat(description.its);
  executeIts(its, () => {
    console.log('Description::: Finished:', description.description);
    console.log('');
    cbCompleted();
  });
}

function executeIts(its, cbCompleted) {
  let it = its.shift();

  if (!it) {
    cbCompleted();
    return;
  }

  console.log('    it:::', it.description);

  if (it.cbTest.length === 0) {
    it.cbTest();
    executeIts(its, cbCompleted);
  } else {
    it.cbTest(() => {
      executeIts(its, cbCompleted);
    });
  }
}

function exit(code) {
  if (typeof process !== 'undefined' && typeof process.exit !== 'undefined') {
    process.exit(code);
  }
}

function finished() {
  let report = 'All TEST finished, results:' + ' ' + 'errors:' + ' ' + global._mockJest.errors + ' ' + 'passed:' + ' ' + global._mockJest.passed;
  console.log('');

  if (global._mockJest.errors) {
    console.log(' xx   xx ');
    console.log('  xx xx  ');
    console.log('   xxx   ');
    console.log('  xx xx  ');
    console.log(' xx   xx ' + report);
    exit(100);
  } else {
    console.log('      vv');
    console.log('     vv');
    console.log('vv  vv');
    console.log(' vvvv');
    console.log('  vv      ' + report);
    exit(0);
  }
}

/***/ }),

/***/ 0:
/*!******************************!*\
  !*** multi ./tests/index.ts ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/dennis/dev/dyna/dyna-logger/tests/index.ts */"./tests/index.ts");


/***/ }),

/***/ "dyna-universal":
/*!*********************************!*\
  !*** external "dyna-universal" ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("dyna-universal");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map