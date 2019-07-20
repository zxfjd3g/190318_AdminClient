import React from 'react'
import PropTypes from "prop-types"
import { Upload, Icon, Modal, message } from 'antd'
import {reqDeleteImg} from '../../api'
import {BASE_IMG} from '../../utils/Constants'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {

  static propTypes = {
    imgs: PropTypes.array
  }

  state = {
    previewVisible: false, // 标识是否显示大图预览
    previewImage: '', // 大图的url或者base64值
    fileList: [
      /* { // 文件信息对象 file
        uid: '-1', // 唯一标识
        name: 'xxx.png', // 文件名
        status: 'done', // 状态有：uploading done error removed
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', // 图片的url
      }, */
    ],
  }

  componentWillMount () {
    // 根据传入的imgs生成fileList并更新
    const imgs = this.props.imgs
    if (imgs && imgs.length>0) {
      const fileList = imgs.map((img, index) => ({
        uid: -index, // 唯一标识
        name: img, // 文件名
        status: 'done', // 状态有：uploading done error removed
        url: BASE_IMG + img
      }))
      this.setState({ fileList })
    }
  }

  /* 
  获取所有已上传图片文件名的数组
  */
  getImgs = () => this.state.fileList.map(file => file.name)


  handleCancel = () => this.setState({ previewVisible: false });

  /* 
  进行大图预览的回调函数
  file: 当前选择的图片对应的file
  */
  handlePreview = async file => {
    if (!file.url && !file.preview) { // 如果file没有图片url, 只进行一次base64处理来显示图片
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  /* 
  在file的状态发生改变的监听回调
  file: 当前操作(上传/删除)的file
  */
  handleChange = async ({ file, fileList }) => {
    // file与fileList中最后一个file代表同个图片的不同对象
    console.log('handleChange()', file.status, file===fileList[fileList.length-1])
    // 如果上传成功
    if (file.status==='done') {
      // 将数组最后一个file保存到file变量
      file = fileList[fileList.length - 1]
      // 取出响应数据中的图片文件名和url
      const {name, url} = file.response.data
      // 保存到上传的file对象
      file.name = name
      file.url = url
    } else if (file.status==='removed') { // 删除
      const result = await reqDeleteImg(file.name)
      if (result.status===0) {
        message.success('删除图片成功')
      } else {
        message.error('删除图片失败')
      }
    }

    // 更新状态
    this.setState({ fileList })
  }


  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
   
    return (
      <div>
        <Upload
          action="/manage/img/upload" // 上传图片的url
          name="image" // 图片文件对应参数名
          listType="picture-card" // 显示风格
          fileList={fileList} // 已上传的所有图片文件信息对象的数组
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}