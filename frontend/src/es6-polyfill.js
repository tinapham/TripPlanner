/* Polyfill service v3.19.0
 * For detailed credits and licence information see https://github.com/financial-times/polyfill-service.
 * 
 * UA detected: samsung_mob/1.1.0 (unknown/unsupported; using policy `unknown=polyfill`)
 * Features requested: Math.trunc
 * 
 * Version range for polyfill support in samsung_mob is: >=4
 * 
 * - Math.trunc, License: CC0 */

(function(undefined) {

// Math.trunc
Math.trunc = function trunc(x) {
	return x < 0 ? Math.ceil(x) : Math.floor(x);
};
})
.call('object' === typeof window && window || 'object' === typeof global && global || {});