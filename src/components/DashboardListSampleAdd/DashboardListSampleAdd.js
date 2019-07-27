import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import ImageZoom from "react-medium-image-zoom";
// import Dropzone from "react-dropzone-uploader";
import ReactFileReader from "react-file-reader";
// import Select from "react-select";
// import axios from "axios";
import "react-dropzone-uploader/dist/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./DashboardListSampleAdd.css";
import { getCaseIdRequest, addSampleRequest } from "../../actions";
const $ = window.$;
class DashboardListSampleAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      codeKT: "",
      note: "",
      status: 0,
      sampleImage: "",
      collectDate: "",
      collector: "",
      receiveDate: "",
      receiver: "",
      deliverDate: "",
      deliverer: "",
      userId: "",
      caseId: "",
      litigantId: "",
      typeId: "",
      gdgSignal: "",
      amount: "",
      startDate: "",
      endDate: "",
      descriptionMan: "",
      photoTaker: "",
      description: "",
      reference: "",
      quantity: "",
      files: [],

      images: [],
      selectedOption: null,
      isClearable: true
    };
  }

  componentDidMount() {
    var { match } = this.props;

    this.props.onGetCaseId(match.params.caseid);
    $(".form-control").each(function() {
      $(this).on("keyup", function() {
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
  }
  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };
  handleChangeStartDate = date => {
    this.setState({
      startDate: date
    });
  };
  handleChangeReceiveDate = date => {
    this.setState({
      receiveDate: date
    });
  };
  handleChangeEndDate = date => {
    this.setState({
      endDate: date
    });
  };
  handleChangeCollectDate = date => {
    this.setState({
      collectDate: date
    });
  };
  handleChangeDeliverDate = date => {
    this.setState({
      deliverDate: date
    });
  };
  handleFiles = files => {
    if (files.base64) {
      files.base64.map((a, i) => {
       return this.setState({
          images: [...this.state.images, a]
        });
      });
    }
  };
  deleteImage = a => {
    var index = this.state.images;
    index.splice(a, 1);
    this.setState({
      images: index
    });
  };
  onSubmit = e => {
    var { history } = this.props;
    const { caseiditem } = this.props;
    e.preventDefault();
    const {
      name,
      code,
      codeKT,
      note,
      collector,
      receiver,
      deliverer,
      photoTaker,
      description,
      startDate,
      endDate,
      gdgSignal,
      amount,
      // files,
      collectDate,
      receiveDate,
      deliverDate,
      reference,
      quantity,
      descriptionMan,
      status,
      images
    } = this.state;

    var sampleItem = {
      Code: code,
      Note: note,
      Status: status,
      // sampleImage: "",
      CollectDate: collectDate,
      Collector: collector,
      ReceiveDate: receiveDate,
      Receiver: receiver,
      DeliverDate: deliverDate,
      Deliverer: deliverer,
      UserID: 1,
      CaseID: caseiditem.ID,
      LitigantID: 1,
      GDGSignal: gdgSignal,
      Amount: amount,
      StartDate: startDate,
      EndDate: endDate,
      DescriptionMan: descriptionMan,
      PhotoTaker: photoTaker,
      Description: description,
      CodeKT: codeKT,
      Quantity: quantity,
      Reference: reference,
      Name: name,
      
      Images: images,
      SaveFileDate: new Date()
    };
    this.props.onAddSample(sampleItem);
    history.push(`/dashboard/case/${caseiditem.ID}`);
  };
  render() {
    const { images } = this.state;
    var { caseiditem } = this.props;
    // const getUploadParams = ({ file, meta }) => {
    //   return axios({
    //     method: "POST",
    //     url: "https://5d009f68d021760014b75103.mockapi.io/image",
    //     data: meta
    //   });
    // };

    // const handleChangeStatus = ({ meta, file }, status) => {
    //   // console.log(status, meta, file);
    // };

    // const handleSubmit = (files, allFiles) => {
    //   allFiles.forEach(f => f.remove());
    // };
    // const { selectedOption, isClearable } = this.state;
    return (
      <Fragment>
        <div className="card card-custom" style={{ marginBottom: "100px" }}>
          <div className="card-body">
            <div className="card-title">Add Sample</div>
            <form onSubmit={this.onSubmit}>
              <div className="row mb-3">
                <div className="col-lg-12">
                  <div className="from-group mb-3">
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        onChange={this.onChange}
                        name="reference"
                        id="customRadioInline3"
                        className="custom-control-input"
                        value={true}
                        required
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customRadioInline3"
                      >
                        Tham chiếu
                      </label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        onChange={this.onChange}
                        name="reference"
                        id="customRadioInline4"
                        className="custom-control-input"
                        value={false}
                        required
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customRadioInline4"
                      >
                        Không tham chiếu
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="code"
                      //   pattern="[0-9][0-9]{3}"
                      required
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Code</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="note"
                      //   pattern="[0-9][0-9]{3}"
                      required
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Note</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      //   pattern="[0-9][0-9]{3}"
                      required
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Name</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="quantity"
                      //   pattern="[0-9][0-9]{3}"
                      required
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Số lượng</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="gdgSignal"
                      //   pattern="[0-9][0-9]{3}"
                      required
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Kí hiệu GDG</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="amoung"
                      //   pattern="[0-9][0-9]{3}"
                      required
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Amount</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="codeKT"
                      //   pattern="[0-9][0-9]{3}"
                      required
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Mã KT</span>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="collector"
                      required
                      //   pattern="[1-9][0-9]{8}"
                      onChange={this.onChange}
                    />

                    <span className="input-placeholder">Collector</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="receiver"
                      required
                      //   pattern="[1-9][0-9]{8}"
                      onChange={this.onChange}
                    />

                    <span className="input-placeholder">Receiver</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="deliverer"
                      required
                      //   pattern="[1-9][0-9]{8}"
                      onChange={this.onChange}
                    />

                    <span className="input-placeholder">Deliverer</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="photoTaker"
                      required
                      //   pattern="[1-9][0-9]{8}"
                      onChange={this.onChange}
                    />

                    <span className="input-placeholder">Photo Taker</span>
                  </div>
                </div>

                {/* <div className="col-lg-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="txtOrganization"
                      onChange={this.onChange}
                      required
                    />
                    <Select
                      value={selectedOption}
                      onChange={this.handleChangeSelect}
                 
                      isClearable={isClearable}
                      options={options}
                      placeholder="Organization"
                    />
                    <span className="input-placeholder">Organization</span>
                  </div>
                </div> */}
                <div className="col-lg-6">
                  <div className="form-group">
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChangeStartDate}
                      showTimeSelect
                      showTimeInput
                      timeInputLabel="Time:"
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd/MM/yyyy h:mm aa"
                      timeCaption="time"
                      placeholderText="Start Date"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <DatePicker
                      selected={this.state.endDate}
                      onChange={this.handleChangeEndDate}
                      showTimeSelect
                      showTimeInput
                      timeInputLabel="Time:"
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd/MM/yyyy h:mm aa"
                      timeCaption="time"
                      placeholderText="End Date"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <DatePicker
                      selected={this.state.collectDate}
                      onChange={this.handleChangeCollectDate}
                      showTimeSelect
                      showTimeInput
                      timeInputLabel="Time:"
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd/MM/yyyy h:mm aa"
                      timeCaption="time"
                      placeholderText="Collect Date"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <DatePicker
                      selected={this.state.deliverDate}
                      onChange={this.handleChangeDeliverDate}
                      showTimeSelect
                      showTimeInput
                      timeInputLabel="Time:"
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd/MM/yyyy h:mm aa"
                      timeCaption="time"
                      placeholderText="Deliver Date"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <DatePicker
                      selected={this.state.receiveDate}
                      onChange={this.handleChangeReceiveDate}
                      showTimeSelect
                      showTimeInput
                      timeInputLabel="Time:"
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd/MM/yyyy h:mm aa"
                      timeCaption="time"
                      placeholderText="Receive Date"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <textarea
                      type="text"
                      className="form-control"
                      name="description"
                      required
                      //   pattern="[1-9][0-9]{8}"
                      onChange={this.onChange}
                    />

                    <span className="input-placeholder">Description</span>
                  </div>
                </div>

                <div className="col-lg-12">
                  {/* <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    onSubmit={handleSubmit}
                    accept="image/*,audio/*,video/*"
                  /> */}

                  <div className="img-upload-wrapper d-flex align-items-center flex-wrap">
                    {images
                      ? images.map((a, i) => {
                          return (
                            <div
                              key={i}
                              className="img-upload-content d-flex align-items-center"
                            >
                              <button
                                type="button"
                                className="remove-image-btn"
                                onClick={() => this.deleteImage(i)}
                              >
                                <i class="fas fa-times" />
                              </button>
                              <button className="deco-delete-btn" />
                              <ImageZoom
                                image={{
                                  src: `${a}`,
                                  alt: "Golden Gate Bridge",
                                  className: "img image-upload-show"
                                }}
                                zoomImage={{
                                  src: `${a}`,
                                  alt: "Golden Gate Bridge"
                                }}
                              />
                              {/* <img className="image-upload-show" src={a} alt="aaa" /> */}
                            </div>
                          );
                        })
                      : null}
                    <div className="btn-upload-image-wrapper d-flex align-items-center">
                      <ReactFileReader
                        base64={true}
                        multipleFiles={true}
                        handleFiles={this.handleFiles}
                      >
                        <div className="btn">Upload Images</div>
                        <div className="icon-upload">
                          <i className="fas fa-cloud-upload-alt" />
                        </div>
                      </ReactFileReader>
                    </div>
                  </div>

                  {/* {this.state.images.map((a,i) => {
                    return (<img key={i} src={a} alt="aaa" />)
                  })} */}
                  {/* <img src={images} alt="aaa"/> */}
                </div>
              </div>

              <button type="submit" className="btn custom-button-1 mr-3">
                Submit
              </button>
              <NavLink
                to={`/dashboard/case/${caseiditem.ID}`}
                className="btn custom-button-2"
              >
                Back
              </NavLink>
              <div />
              {/* <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  accept='image/*'
                  onChange={this.handleImageChange}
                  multiple
                />
              
              </div> */}
            </form>
            {/* {imagesPreviewUrls.map(function(imagePreviewUrl, i){
                    return <img key={i} src={imagePreviewUrl} alt="" />
                })} */}
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    caseiditem: state.caseiditem
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetCaseId: caseId => {
      dispatch(getCaseIdRequest(caseId));
    },
    onAddSample: sampleItem => {
      dispatch(addSampleRequest(sampleItem));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardListSampleAdd);
