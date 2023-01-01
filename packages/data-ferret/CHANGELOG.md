# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

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
