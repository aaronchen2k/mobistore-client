"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const CONSTANTS = require('../../../constants/constants');
const ProductDao = require('../dao/product');
const CollectionDao = require('../dao/collection');
const ShoppingCartDao = require('../dao/shoppingCart');

module.exports = class ProductService {
    static getWithCartNumb(id) {
       return Promise.join(ProductDao.get(id), CollectionDao.isCollected(id),
              ShoppingCartDao.getItemNumb(CONSTANTS.testClientId),
            function (product, isCollected, shoppingCartItemCount) {
                return new Promise((resolve, reject) => {
                    resolve({
                          product: product,
                          isCollected: isCollected,
                          shoppingCartItemCount: shoppingCartItemCount
                    });
                });
            }
        );
    }
};
