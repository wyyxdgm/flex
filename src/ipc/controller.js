let fs = require('fs');
let path = require('path');
const ImageModel = require('../model/ImageModel');
import { image2base64 } from '../util/util'

const Shape = require('../model/Shape');
const ShapeRect = require('../model/ShapeRect');


class Controller {
  constructor() {
    this.model = {
      filePath: null,
      imageModel: null,
      base64: null,
    };
  }
  IPC_FILE_SELECT(filePath) {
    const { model } = this;
    if (filePath) {
      model.filePath = filePath;
      model.imageModel = null;
      model.base64 = null;
    }
    return model;
  }
  async IPC_FILE_SCAN(filePath) {
    const { model } = this;
    model.base64 = await image2base64(filePath);
    model.imageModel = await ImageModel.newInstance(filePath);
    return model;
  }
}


export default Controller
