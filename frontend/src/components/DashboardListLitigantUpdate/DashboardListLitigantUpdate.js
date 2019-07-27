import React, { Component, Fragment } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DashboardListLitigantUpdate.css"
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import "react-dropzone-uploader/dist/styles.css";
import moment from 'moment';
import { updateLitigantRequest, getLitigantUpdateRequest } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faImages } from '@fortawesome/free-solid-svg-icons';
import ReactFileReader from 'react-file-reader';
const $ = window.$;
const options = [
  { value: true, label: "Nữ" },
  { value: false, label: "Nam" }
];

class DashboardListLitigantUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: null,
      txtName: "",
      txtNation: "",
      txtAddress: "",
      txtHometown: "",
      dob: null,
      slSex: null,
      txtCMND: "",
      txtJob: "",
      txtEducation: "",
      txtRace: "",
      isClearable: true,
      DateRec: null,
      portraitimage: null,
      images: []
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
    console.log(date);
    this.setState({
      DateRec: date
    });
    var ChangeDate = new Date(date);
    this.setState({
      dob: moment(ChangeDate).format("YYYY-MM-DD")
    })
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

    var { match } = this.props;
    if (match) {
      var id = match.params.id;
      this.props.onEditLitigant(id);
    };
  };

  handleFile = (file) => {
    if (file.base64[0].split("/")[0] === "data:image") {
      this.setState({
        portraitimage: file.base64
      })
    }
  }

  removeImage = () => {
    this.setState({
      portraitimage: null
    });
  };

  removeImages = value => {
    var array = [...this.state.images];
    var index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({
        images: array
      });
    };
  };


  handleFiles = (files) => {
    var imagefile = this.state.images;
    if (files.base64[0].split("/")[0] === "data:image") {
      files.base64.forEach(element => {
        imagefile.push(element);
      });
      this.setState({
        images: imagefile
      })
    } else {
      console.log("b")
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.litigantUpdate) {
      var { litigantUpdate } = nextProps;
      this.setState({
        ID: litigantUpdate.ID,
        txtName: litigantUpdate.Name,
        txtNation: litigantUpdate.Nation,
        txtAddress: litigantUpdate.Address,
        txtHometown: litigantUpdate.HomeTown,
        slSex: litigantUpdate.Sex,
        txtCMND: litigantUpdate.IdentifyCard,
        DateRec: litigantUpdate.DoB,
        dob: litigantUpdate.DoB,
        portraitimage: litigantUpdate.PortraitImage,
        images: litigantUpdate.Images,
        txtJob: litigantUpdate.Job,
        txtEducation: litigantUpdate.Education,
        txtRace: litigantUpdate.Race
      });
    };
  };

  onSubmit = e => {
    e.preventDefault();
    var { history } = this.props;
    var { ID, txtName, txtNation, txtAddress, txtHometown, dob, slSex, txtCMND, txtRace, txtJob, txtEducation, portraitimage, images } = this.state;
    var litigant = {
      ID: ID,
      Name: txtName,
      Sex: slSex.value,
      Nation: txtNation,
      HomeTown: txtHometown,
      Address: txtAddress,
      DoB: dob,
      IdentifyCard: parseInt(txtCMND),
      Race: txtRace,
      Job: txtJob,
      Education: txtEducation,
      PortraitImage: portraitimage,
      Images: images
    }
    this.props.onUpdateLitigant(litigant);
    history.push("/dashboard/litigant");
  }

  getSelectedValue = () => {
    var { slSex } = this.state;
    if (slSex === true) {
      this.setState({
        slSex: { value: true, label: "Nữ" }
      });
    };
    if (slSex === false) {
      this.setState({
        slSex: { value: false, label: "Nam" }
      });
    };
  }

  render() {
    const { txtName, txtNation, txtAddress, txtHometown, slSex, isClearable, txtCMND, DateRec, txtRace, txtJob, txtEducation, portraitimage, images, dob } = this.state;
    { this.getSelectedValue() }
    return (
      <Fragment>
        <div className="card card-custom" style={{ marginTop: "100px" }}>
          <div className="card-body">
            <div className="card-title">Cập nhật đương sự</div>
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      value={txtName}
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
                      placeholder="Sex"
                    />
                  </div>
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <DatePicker
                      value={moment(dob).format("DD/MM/YYYY")}
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
                      value={txtNation}
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
                      value={txtAddress}
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
                      value={txtHometown}
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
                      value={txtCMND}
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
                      value={txtJob}
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
                      value={txtEducation}
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
                      value={txtRace}
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
                  {(portraitimage !== null && portraitimage !== undefined) ? (
                    <div className="col-lg-4">
                      <div className='fadein'>
                        <div
                          onClick={() => this.removeImage()}
                          className='delete'
                        >
                          <FontAwesomeIcon icon={faTimesCircle} size='2x' />
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
                        <FontAwesomeIcon icon={faImages} color='#6d84b4' size='5x' />
                      </label>
                    </ReactFileReader>
                  </div>
                </div>
                <div className="col-lg-12">
                  Ảnh Nhân Sự
                  {(images !== null && images !== undefined) ? images.map((value, index) =>
                    <div className="col-lg-4" key={index}>
                      <div className='fadein'>
                        <div
                          onClick={() => this.removeImages(value)}
                          className='delete'
                        >
                          <FontAwesomeIcon icon={faTimesCircle} size='2x' />
                        </div>
                        <img
                          src={value}
                          alt=''
                          style={{ width: '150px', height: '150px' }}
                        />
                      </div>
                    </div>
                  ) : ""}
                </div>
                <div className="col-lg-12">
                  <div className="button">
                    <ReactFileReader handleFiles={this.handleFiles} base64={true} multipleFiles={true}>
                      <label>
                        <FontAwesomeIcon icon={faImages} color='#6d84b4' size='5x' />
                      </label>
                    </ReactFileReader>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn custom-button-1 mr-3">
                Cập nhật
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

const mapStateToProps = state => {
  return {
    litigantUpdate: state.litigant
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onEditLitigant: (id) => {
      dispatch(getLitigantUpdateRequest(id));
    },
    onUpdateLitigant: (litigant) => {
      dispatch(updateLitigantRequest(litigant));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardListLitigantUpdate);