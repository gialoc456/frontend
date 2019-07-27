import React, { Component, Fragment } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DashboardListLitigantAdd.css"
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import "react-dropzone-uploader/dist/styles.css";
import { addLitigantRequest, createNotificationRequest } from '../../actions';
import ReactFileReader from 'react-file-reader';
import { file } from '@babel/types';

const $ = window.$;
const options = [
  { value: true, label: "Nữ" },
  { value: false, label: "Nam" }
];

class DashboardListLitigantAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtNation: "",
      txtAddress: "",
      txtHometown: "",
      dob: "",
      slSex: null,
      txtCMND: "",
      txtJob: "",
      txtEducation: "",
      txtRace: "",
      isClearable: true,
      images: [],
      files: [],
      portraitimage: null,
    }
  }

  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  }

  handleChangeSelect = (slSex) => {
    this.setState({
      slSex: slSex
    });
  };

  handleChangeDate = date => {
    this.setState({
      dob: date
    });
  };

  componentDidMount() {
    $(".form-control").each(function () {
      $(this).on("keyup", function () {
        if (
          $(this)
            .val()
            .trim() !== ""
        ) {
          $(this).addClass("has-val");
          $(this)
            .next("span")
            .css({ visibility: "hidden", opacity: "0" });
        } else {
          $(this).removeClass("has-val");
          $(this)
            .next("span")
            .css({ visibility: "visible", opacity: "1" });
        }
      });
    });
  };

  // handleImageChange = e => {
  //   this.setState({
  //     images: e.target.files,
  //   })
  //   var newItem = this.state.files;
  //   for (let index = 0; index < e.target.files.length; index++) {
  //     newItem.push(URL.createObjectURL(e.target.files[index]));
  //     console.log(newItem);
  //   }
  //   this.setState({
  //     files: newItem
  //   });
  // };

  removeImage = () => {
    this.setState({
      portraitimage: null
    });
  };

  removeImages = value => {
    var array = [...this.state.files];
    var index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({
        files: array
      });
    };
  };

  handleFiles = (files) => {
    var images = this.state.files;
    files.base64.forEach(element => {
      images.push(element);
    });
    this.setState({
      files: images
    })
  }

  handleFile = (file) => {
    this.setState({
      portraitimage: file.base64
    })
  }

  onSubmit = e => {
    var { history } = this.props;
    var { txtName, txtNation, txtAddress, txtHometown, dob, slSex, txtCMND, files, txtJob, txtRace, txtEducation, portraitimage } = this.state;
    // console.log(images)
    // var formData = new FormData();
    // formData.append('image',images);
    // formData.append('Name',txtName);
    const Date = dob.toISOString().split('T');
    e.preventDefault();
    var litigant = {
      Name: txtName,
      Sex: slSex.value,
      Nation: txtNation,
      HomeTown: txtHometown,
      Address: txtAddress,
      DoB: Date[0],
      IdentifyCard: parseInt(txtCMND),
      Job: txtJob,
      Education: txtEducation,
      Race: txtRace,
      PortraitImage: portraitimage,
      Images: files,
    };
    var notification = {
      Content: 'Đã tạo 1 đương sự mới'
    }
    this.props.onAddNotification(notification);
    // this.props.onAddLitigant(litigant);
    // history.push("/dashboard/litigant");
  }


  render() {
    const hide = {
      display: 'none'
    }
    const { slSex, isClearable, files, portraitimage } = this.state;
    return (
      <Fragment>
        <div className="card card-custom" style={{ marginTop: "100px" }}>
          <div className="card-body">
            <div className="card-title">Tạo Đương Sự</div>
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="txtName"
                      //   pattern="[0-9][0-9]{3}"
                      required
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Tên</span>
                  </div>
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <Select
                      value={slSex}
                      onChange={this.handleChangeSelect}
                      name="slSex"
                      isClearable={isClearable}
                      options={options}
                      placeholder="Giới tính"
                    />
                  </div>
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <DatePicker
                      selected={this.state.dob}
                      onChange={this.handleChangeDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Ngày sinh"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6"></div>
                {/* <div className="col-lg-6">
                      
                      <Dropzone
                        getUploadParams={getUploadParams}
                        onChangeStatus={handleChangeStatus}
                        onSubmit={handleSubmit}
                        accept="image/*,audio/*,video/*"
                      />
                    </div> */}
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="txtNation"
                      //   pattern="[0-9][0-9]{3}"
                      required
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Quốc tịch</span>
                  </div>
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="txtAddress"
                      //   pattern="[0-9][0-9]{3}"
                      required
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Địa chỉ</span>
                  </div>
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="txtHometown"
                      //   pattern="[0-9][0-9]{3}"
                      required
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Quê quán</span>
                  </div>
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      name="txtCMND"
                      required
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Chứng minh nhân dân</span>
                  </div>
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="txtJob"
                      required
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Nghề nghiệp</span>
                  </div>
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="txtEducation"
                      required
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Học vấn</span>
                  </div>
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="txtRace"
                      required
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Dân tộc</span>
                  </div>
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-12">
                  Ảnh 3x4
                  {portraitimage !== null ? (
                    <div className="col-lg-4">
                      <div className='fadein'>
                        <div
                          onClick={() => this.removeImage()}
                          className='delete'
                        >
                          {/* <FontAwesomeIcon icon={faTimesCircle} size='2x' /> */}
                        </div>
                        <img
                          src={portraitimage}
                          alt=''
                          style={{ width: '150px', height: '150px' }}
                        />
                      </div>
                    </div>
                  ) : (<div></div>)}
                </div>
                <div className="col-lg-12">
                  <div className="button">
                    <ReactFileReader handleFiles={this.handleFile} base64={true}>
                      <label>
                        {/* <FontAwesomeIcon icon={faImages} color='#6d84b4' size='5x' /> */}
                      </label>
                    </ReactFileReader>
                  </div>
                </div>
                <div className="col-lg-12">
                  Ảnh Đương Sự
                  {files.map((value, index) =>
                    <div className="col-lg-4" key={index}>
                      <div className='fadein'>
                        <div
                          onClick={() => this.removeImages(value)}
                          className='delete'
                        >
                          {/* <FontAwesomeIcon icon={faTimesCircle} size='2x' /> */}
                        </div>
                        <img
                          src={value}
                          alt=''
                          style={{ width: '150px', height: '150px' }}
                          onError={() => this.props.onError(index)}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-lg-12">
                  <div className="button">
                    <ReactFileReader handleFiles={this.handleFiles} base64={true} multipleFiles={true}>
                      <label>
                        {/* <FontAwesomeIcon icon={faImages} color='#6d84b4' size='5x' /> */}
                      </label>
                    </ReactFileReader>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn custom-button-1 mr-3">
                Tạo Mới
                  </button>
              <NavLink to="/dashboard/litigant" className="btn custom-button-2">
                Quay lại
                  </NavLink>
              <div />

            </form>

          </div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddLitigant: litigant => {
      dispatch(addLitigantRequest(litigant));
    },
    onAddNotification: notification =>{
      dispatch(createNotificationRequest(notification));
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DashboardListLitigantAdd);