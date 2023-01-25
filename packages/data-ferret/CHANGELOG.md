# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [2.0.0](https://github.com/enio-ireland/enio/compare/data-ferret-1.4.0...data-ferret-2.0.0) (2023-01-25)


### ⚠ BREAKING CHANGES

* **data-ferret:** registerIterableClass function has changed

### Features

* **data-ferret:** add locateText to API :sparkles: ([013efd0](https://github.com/enio-ireland/enio/commit/013efd0a794f8c027eee27411801b85c49a9878a))
* **data-ferret:** add removeKey to API :sparkles: ([3417285](https://github.com/enio-ireland/enio/commit/34172853a194b50aed9be52fb7830f475f42b778))
* **data-ferret:** add renameKey to API :sparkles: ([e12daf7](https://github.com/enio-ireland/enio/commit/e12daf71ef48ded0566978eeb5287d08fc25adf1))
* **data-ferret:** add replaceText to API :sparkles: ([3b3c37a](https://github.com/enio-ireland/enio/commit/3b3c37aac17a0eabc143a4d28b0eefa106d0bafc))


### Code Refactoring

* **data-ferret:** a remove function must be specified to register an iterable class ([871b058](https://github.com/enio-ireland/enio/commit/871b058028e77e32bbee03b6deba40121461043a))

## [1.4.0](https://github.com/enio-ireland/enio/compare/data-ferret-1.3.0...data-ferret-1.4.0) (2023-01-24)


### Features

* **data-ferret:** add getUniqueKeys to API :sparkles: ([455115d](https://github.com/enio-ireland/enio/commit/455115df3bdba87e4bc3f43a3e8c5642e98ee296))
* **data-ferret:** add locateKey to API :sparkles: ([df9f737](https://github.com/enio-ireland/enio/commit/df9f73747a1683b18e4e4086afe2a80cf954e75f))

## [1.3.0](https://github.com/enio-ireland/enio/compare/data-ferret-1.2.0...data-ferret-1.3.0) (2023-01-23)


### Features

* **data-ferret:** add getDepth to API :sparkles: ([5bebe08](https://github.com/enio-ireland/enio/commit/5bebe0830584524ba3b2850698d7c4a17e58f7c7))
* **data-ferret:** add getValue to API :sparkles: ([bffacb9](https://github.com/enio-ireland/enio/commit/bffacb968b677ee8d1b37f46892221f2c2441e53))


### Bug Fixes

* **data-ferret:** built-in iterables Object and Array return correct keys and omits markers ([10b7600](https://github.com/enio-ireland/enio/commit/10b7600c15076049c30b6b7789e1058e281d6467))
* **data-ferret:** hasCircularReference now correctly supports custom iterable types ([92c3602](https://github.com/enio-ireland/enio/commit/92c3602446c8b80fca933495114e76563b9eb041))
* **data-ferret:** isIdentical now correctly supports custom iterable types with circular references ([845427a](https://github.com/enio-ireland/enio/commit/845427ae321a672480353b08b8a490f8aa0fde5a))
* **data-ferret:** isIdentical now correctly supports custom iterable types without circular refs ([1a3469c](https://github.com/enio-ireland/enio/commit/1a3469c635ae792eef6c1d2f50d950fecbaa5b71))
* **data-ferret:** locateCircularReference supports custom iterable types with circular refs ([0749394](https://github.com/enio-ireland/enio/commit/07493944c008953d8343105e5bc29a44fb074c9b))
* **data-ferret:** registerIterableClass decorates getKeys operator to support circular references ([d6f5d86](https://github.com/enio-ireland/enio/commit/d6f5d86a16c5880ab1de60178f6664773d58def7))
* **data-ferret:** sameStructure now correctly supports custom iterable types ([88179aa](https://github.com/enio-ireland/enio/commit/88179aa3d26176f83c1ae0a6bb08fb22aeb5dbb2))


### Reverts

* **data-ferret:** getValue's path argument can only be an array ([10504da](https://github.com/enio-ireland/enio/commit/10504da0f182b34571c9c212459bfe031d7bb3ba))

## [1.2.0](https://github.com/enio-ireland/enio/compare/data-ferret-1.1.0...data-ferret-1.2.0) (2023-01-21)


### Features

* **data-ferret:** add traverse to API :sparkles: ([c0f0598](https://github.com/enio-ireland/enio/commit/c0f059840eeddb104d7d53c734ad18165220c8e3))

## [1.1.0](https://github.com/enio-ireland/enio/compare/data-ferret-1.0.3...data-ferret-1.1.0) (2023-01-20)


### Features

* **data-ferret:** add locateCircularReference to API :sparkles: ([ec90707](https://github.com/enio-ireland/enio/commit/ec907074005849780dbf06606139dbc355c40bf2))


### Bug Fixes

* **data-ferret:** hasCircularReference now correctly removes markers ([4961515](https://github.com/enio-ireland/enio/commit/4961515a591ed64bb3ba0e17a2867cb096645c58))

## [1.0.3](https://github.com/enio-ireland/enio/compare/data-ferret-1.0.2...data-ferret-1.0.3) (2023-01-16)


### Bug Fixes

* **data-ferret:** update build so that package is usable my most projects ([6796d81](https://github.com/enio-ireland/enio/commit/6796d81ab57b419de3028fbe07b3d32c3a2802e7))

## [1.0.3](https://github.com/enio-ireland/enio/compare/data-ferret-1.0.2...data-ferret-1.0.3) (2023-01-16)


### Bug Fixes

* **data-ferret:** update build so that package is usable my most projects ([6796d81](https://github.com/enio-ireland/enio/commit/6796d81ab57b419de3028fbe07b3d32c3a2802e7))

## [1.0.2](https://github.com/enio-ireland/enio/compare/data-ferret-1.0.1...data-ferret-1.0.2) (2023-01-16)

## [1.0.1](https://github.com/enio-ireland/enio/compare/data-ferret-1.0.0...data-ferret-1.0.1) (2023-01-01)

## [1.0.0](https://github.com/enio-ireland/enio/compare/data-ferret-0.1.1...data-ferret-1.0.0) (2022-12-27)


### ⚠ BREAKING CHANGES

* to support custom classes for cloning, iterable class registration was reworked

### Features

* add selectiveCopy() to API for data cloning ([ad570fa](https://github.com/enio-ireland/enio/commit/ad570faefc38cd7c6c78f237a91e1543e4c9d3a4))

## [0.1.1](https://github.com/enio-ireland/enio/compare/data-ferret-0.1.0...data-ferret-0.1.1) (2022-11-18)

## 0.1.0 (2022-11-18)


### Features

* **data-ferret:** add containsKeys to API :sparkles: ([47a7104](https://github.com/enio-ireland/enio/commit/47a7104ae7bc55053e51430962dd56c64d78a2f7))
* **data-ferret:** add getConfig to API ([bf74f66](https://github.com/enio-ireland/enio/commit/bf74f664b3a5ba018bf82e694b811de50822a4a0))
* **data-ferret:** add getType() to API ([0e56da1](https://github.com/enio-ireland/enio/commit/0e56da120f0c50b7faa8f35797b602bc4a4f8f01))
* **data-ferret:** add hasCircularReference to API :sparkles: ([8ea6eea](https://github.com/enio-ireland/enio/commit/8ea6eea16cc1a8d14836549ff968c6c01d894252))
* **data-ferret:** add identical to API ([2d36ef9](https://github.com/enio-ireland/enio/commit/2d36ef98aa45599d5c575ec60f9f6c1be571f147))
* **data-ferret:** add isIdentical to API ([2f40aab](https://github.com/enio-ireland/enio/commit/2f40aab45cf071547c26aff75d38522eae9fb645))
* **data-ferret:** add registerClassTypes() to API ([9fddc8e](https://github.com/enio-ireland/enio/commit/9fddc8e498089cc8c87cf70a1235bc959faa1c7d))
* **data-ferret:** add registerIterableClass to API ([8208d0d](https://github.com/enio-ireland/enio/commit/8208d0dcf627d1c0f90bd6c518a287814be86a53))
* **data-ferret:** add sameStructure and isIterable to API :sparkles: ([05f11f4](https://github.com/enio-ireland/enio/commit/05f11f4af98e29e450c8c453bb195a7ba303790c))
* **data-ferret:** add sameStructure to API ([3f0703f](https://github.com/enio-ireland/enio/commit/3f0703f466df6b149bc25a1654a5f9f169eb6b87))
* **data-ferret:** add sameType to API ([278385a](https://github.com/enio-ireland/enio/commit/278385ab210ad70e1689be57a3a4ff2de7b4eba6))
* **data-ferret:** extend API to support special marker properties for reference tracking ([5389d69](https://github.com/enio-ireland/enio/commit/5389d69dad84df8695d76b661321e816eaae3fb6))
* **data-ferret:** extend getType to return new data types based on known classes ([2ca532e](https://github.com/enio-ireland/enio/commit/2ca532e26b2a0befe64e88bb6c1afb6038d6dcf0))
* **data-ferret:** identical API has equality check for values with circular references :sparkles: ([f9038c2](https://github.com/enio-ireland/enio/commit/f9038c20596f82c285cfa3ecc152432e192b5d85))
* **data-ferret:** new javascript library ([6769e1d](https://github.com/enio-ireland/enio/commit/6769e1db96dcbff4fb0370ca20623f48a0152cfb))
* **data-ferret:** support function comparison :sparkles: ([7a38e7e](https://github.com/enio-ireland/enio/commit/7a38e7e2e000c42de5cded5c482cb00ed82bb411))


### Bug Fixes

* **data-ferret:** ease regex that failed inconsistently on isMarker :bug: ([7bb8f69](https://github.com/enio-ireland/enio/commit/7bb8f6956d77d9bc6a5a27883a433b7a4ceced86))
* **data-ferret:** isMarker no longer requires a fixed digits length :bug: ([dc25575](https://github.com/enio-ireland/enio/commit/dc255752843517d8378f1df6964bdf70a8f16729))


### Performance Improvements

* **data-ferret:** sameStructure perform a check in O(1) :zap: ([afd8db3](https://github.com/enio-ireland/enio/commit/afd8db36c7dccfa9f04b25bce7f5e442dfecde71))
