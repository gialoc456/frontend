import React, { Component, Fragment } from "react";
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import moment from "moment";
import AutosizeInput from "react-input-autosize";
import TextareaAutosize from "react-autosize-textarea";

import { connect } from "react-redux";
import "./DashboardGenerateConclusion.css";
import { getResultStepBySampleIdRequestV2 } from "../../actions";
import Axios from "axios";
import logo from "./../../resources/01.png";


var doc = new jsPDF();

class DashboardGenerateConclusion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      test: [],
      label: [],
      testV2: [],
      dataCase: {},
      dataOrganization: {},
      value2: "example"
    };
    this.printDocument = this.printDocument.bind(this);
  }

  updateInputValue = (input, event) => {
    const newState = {};
    newState[input] = event.target.value;
    this.setState(newState);
  };

  addFooters = () => {
    const pageCount = doc.internal.getNumberOfPages();
    for (var i = 0; i < pageCount; i++) {
      doc.text(String(i), 196, 285);
    }
  };
  // componentWillReceiveProps({ resultstepbysampleid }) {
  //   var arr = [];
  //   arr.push(resultstepbysampleid[0]);
  //   this.setState({
  //     options: arr
  //   });
  // }
  // componentWillReceiveProps(nextProps) {
  //   var okee = []
  //   okee.push(nextProps.resultstepbysampleid)
  //   this.setState({
  //     test:[...this.state.test, okee ]
  //   })
  // }

  componentWillMount() {
    const { dataLitigant, dataSample,dataUser } = this.props.location;
   console.log(dataSample)
    Axios.get(
      `http://localhost:56524/api/Cases/Litigant?litigantName=${
        dataLitigant.label
      }`
    ).then(res => {
      this.setState(
        {
          dataCase: res.data[0]
        },
        () => {
          Axios.get(
            `http://localhost:56524/api/Organizations/${
              this.state.dataCase.OrganizationID
            }`
          ).then(res => {
            this.setState({
              dataOrganization: res.data
            });
          });
        }
      );
    });

    dataSample.map(a => {
      // return  this.props.onGetResultStepBySampleId(dataLitigant.data.id, a.data.id)
      return Axios.get(
        `http://localhost:56524/api/Result?sampleId=${a.value}`
      ).then(res => {
        console.log(res)
        this.setState({
          // test: [...this.state.test, res.data[0].file[1].rows],
          // label: [res.data[0].file[1].rows]
          test: [...this.state.test, res.data[0].Rows],
          label: [res.data[0].Rows]
        });
      });
    });
  
  }
  async printDocument() {
    this.textareaValue();
    window.scroll({ top: 0, left: 0 });
    var len = 5; //$x(".//body/div/div").length
    var pdf = new jsPDF("p", "mm", "a4");

    for (let i = 1; i <= len; i++) {
      var height = i === 3 ? 150 : i === 4 ? 100 : 275;
      await html2canvas(document.querySelector("#part" + i)).then(canvas => {
        console.log("CHạy");
        pdf.setFontSize(12);
        pdf.setTextColor("#666666");
        pdf.addImage(canvas.toDataURL("images/png"), "PNG", 0, 10, 210, height );
        pdf.text(105, 293, `${i}`);

        if (i === len) {
          // pdf.save('sample-file.pdf');
          window.open(pdf.output("bloburl"), "_blank");
        } else {
          pdf.addPage();
        }
      });
    }

    // const input = document.getElementById("divToPrint");
    // html2canvas(input).then(canvas => {
    //   const imgData = canvas.toDataURL("image/png");
    //   var imgWidth = 212;
    //   var pageHeight = 297;
    //   var imgHeight = (canvas.height * imgWidth) / canvas.width;
    //   var heightLeft = imgHeight;
    //   var doc = new jsPDF("p", "mm");
    //   var position = 0;

    //   doc.addImage(imgData, "PNG", -2, 0, imgWidth, imgHeight - 13);
    //   heightLeft -= pageHeight;
    //   while (heightLeft >= 0) {
    //     position = heightLeft - imgHeight;
    //     doc.addPage();
    //     doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight - 13);
    //     heightLeft -= pageHeight;
    //   }

    //   window.open(doc.output("bloburl"), "_blank");

    //   //   // pdf.output('dataurlnewwindow');

    // });
  }

  textareaValue = () => {
    var text = document.querySelector("textarea").value;
    var parent = document.querySelector("#part3");
    var child = document.querySelector("#removethis");

    var lines = text.split("\n");
    var html = lines
      .filter(line => line.trim() !== "")
      .map(line => `<li class="c1_2v">${line}</li>`)
      .join("");
    document.querySelector("#dayne").innerHTML = html;
    parent.removeChild(child);
  };

  render() {
    // console.log(this.props.resultstepbysampleid)
    // console.log(this.props.location);
    // console.log(this.state.options);
    // console.log(this.state.options.length);
    // console.log(this.state.test);
    // console.log(this.state.label);
    console.log(this.state.dataCase);
    const { dataCase, dataOrganization } = this.state;
    const { dataLitigant, dataSample,dataUser } = this.props.location;
    // console.log(dataSample);
    // console.log(dataLitigant.data);
    return (
      <Fragment>
        {/* <div className="form-wrapper">
          <div className="form-content"> */}
        <div className="print-btn">
          <button onClick={this.printDocument}>Print</button>
        </div>
        {/* <div style={{ top: "50px" }}>
          <button onClick={this.textareaValue}>TEST</button>
        </div> */}
        <div
          // className="from-content--header"
          className="mt4"
          id="divToPrint"
          style={{
            backgroundColor: "#fff",
            width: "210mm",
            minHeight: "297mm",
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: "40px",
            // padding: "0.6in 1in",
            position: "relative"
          }}
        >
          {/* PAGE 1 */}

          <div
            className="print-wrap page1"
            id="part1"
            style={{ padding: "0px 1in 0px" }}
          >
            <div className="d-flex justify-content-between text-center header-content--custom mb-3">
              <div>
                <p>SỞ Y TẾ TP. HỒ CHÍ MINH </p>
                <p style={{ fontWeight: "bold" }}>TRUNG TÂM PHÁP Y </p>
              </div>
              <div>
                <p style={{ fontWeight: "bold" }}>
                  CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </p>
                <p style={{ fontWeight: "bold" }}>
                  Độc lập – Tự do – Hạnh phúc
                </p>
              </div>
            </div>

            <div
              className="d-flex justify-content-between text-center mb-4"
              style={{ padding: "0px 0.4in" }}
            >
              <div>
                <p>Số: {dataCase.Code}</p>
              </div>
              <div>
                <p style={{ fontStyle: "italic" }}>
                  Tp.HCM,{" "}
                  {moment(dataCase.QDTCSignDate).format(
                    "[ngày] DD [tháng] MM [năm] YYYY"
                  )}
                </p>
              </div>
            </div>
            <h6
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "20px"
              }}
            >
              BẢN KẾT LUẬN GIÁM ĐỊNH PHÁP Y VỀ ADN
            </h6>

            <div
              className="profile-info d-flex"
              style={{ marginBottom: "30px" }}
            >
              <div
                className="profile-info--avatar_wrapper"
                style={{ width: "30%" }}
              >
                <div className="profile-info--avatar">
                  <img src={logo} alt="dsadas" />
                </div>
              </div>
              <div className="profile-info--info pl-3" style={{ width: "70%" }}>
                <p>
                  <b style={{ marginRight: "10px" }}>Họ và tên:</b>
                  {dataLitigant.data.Name}
                </p>
                <div className="d-flex justify-content-between">
                  <div>
                    <p>
                      <b style={{ marginRight: "10px" }}>Năm sinh:</b>
                      {moment(dataLitigant.data.DoB).format("YYYY")}
                    </p>
                  </div>
                  <div className="sex-control ml-5">
                    <p style={{ display: "inline-block" }}>
                      <b>Giới:</b>
                    </p>
                    <div className="custom-control custom-radio custom-control-inline ml-2">
                      <input
                        type="radio"
                        id="customRadioInline1"
                        name="customRadioInline1"
                        className="custom-control-input"
                        checked={dataLitigant.data.Sex === true ? true : false}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customRadioInline1"
                      >
                        Nam
                      </label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        id="customRadioInline2"
                        name="customRadioInline1"
                        className="custom-control-input"
                        checked={dataLitigant.data.Sex === false ? true : false}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customRadioInline2"
                      >
                        Nữ
                      </label>
                    </div>
                  </div>
                </div>
                <p style={{ wordWrap: "break-word" }}>
                  <b style={{ marginRight: "10px" }}>Địa chỉ:</b>
                  {dataLitigant.data.HomeTown}
                </p>
                <p>
                  <b style={{ marginRight: "10px" }}>Trình độ văn hóa:</b>8/12
                </p>
                <p>
                  <b style={{ marginRight: "10px" }}>Dân tộc:</b>.....
                </p>
                <p>
                  <b style={{ marginRight: "10px" }}>Tôn giáo:</b>.....
                </p>
                <p>
                  <b style={{ marginRight: "10px" }}>Nghề nghiệp:</b>.....
                </p>
              </div>
            </div>

            <p style={{ textIndent: "40px" }}>
              Căn cứ Quyết định trưng cầu giám định pháp y số{" "}
              {dataCase.QDTCNumber}, ký{" "}
              {moment(dataCase.QDTCSignDate).format(
                "[ngày] DD [tháng] MM [năm] YYYY"
              )}{" "}
              của {dataOrganization.Name}.
            </p>

            <p style={{ textIndent: "40px" }}>Chúng tôi:</p>
            <ul className="join-table">
              <li style={{ textIndent: "40px" }}>
                ĐẶNG MAI ANH TUẤN – Thạc sĩ Sinh Học, Giám định viên{" "}
              </li>
              <p style={{ textIndent: "40px" }}>
                Đã tiến hành giám định cho ... Thúy Trang vào hồi 07 giờ 35
                phút, ngày 03 tháng 06 năm 2019 tại Trung tâm Pháp Y thành phố
                Hồ Chí Minh; với sự trợ giúp của:{" "}
              </p>
              <li style={{ textIndent: "40px" }}>
                BÙI THỊ THU THẢO – Thạc sĩ Công nghệ sinh học
              </li>
              <li style={{ textIndent: "40px" }}>
                NGUYỄN THỊ LAN HƯƠNG – Kỹ sư Công nghệ sinh học
              </li>
            </ul>
            <h6>I. TÌNH HÌNH SỰ VIỆC: </h6>
            <p style={{ textIndent: "40px" }}>
              Theo Quyết định trưng cầu số {dataCase.Code}, ký {moment(dataCase.QDTCSignDate).format("[ngày] DD [tháng] MM [năm] YYYY")} của {dataOrganization.Name}.
            </p>
            <h6>II. NGHIÊN CỨU HỒ SƠ, TÀI LIỆU:</h6>
            <p style={{ textIndent: "40px" }}>Sơ lược lại hồ sơ:</p>
            <ul>
              <li style={{ textIndent: "40px" }}>
                1. Hồ sơ tài liệu gồm:
                <ul className="join-table">
                  <li style={{ marginLeft: "50px", textIndent: "0px" }}>
                    Quyết định trưng cầu số {dataCase.Code}, ký {moment(dataCase.QDTCSignDate).format("[ngày] DD [tháng] MM [năm] YYYY")} của {dataOrganization.Name}.
                  </li>
                  <li style={{ marginLeft: "50px", textIndent: "0px" }}>
                    Biên bản giao nhận mẫu giám định giữa phòng Khám Thương Tật
                    và phòng Sinh Học Phân Tử của Trung Tâm Pháp Y thành phố Hồ
                    Chí Minh.
                  </li>
                </ul>
              </li>
              <li style={{ textIndent: "40px" }}>
                2. Nội dung giám định ADN: {dataSample.map((a,i) => {
                  return (<span key={i}>{a.Name},</span>)
                })} thuộc ca 94/TD.19
                 {/* Giám định ADN nhiễm sắc thể Y mẫu
                phết dịch âm đạo và phết vùng hậu môn thuộc ca 94/TD.19. */}
              </li>
              <li style={{ textIndent: "40px" }}>
                3. Nghiên cứu bản kết luận giám định trước: Giám định lần đầu
                tại Trung Tâm Pháp Y thành phố Hồ Chí Minh.
              </li>
            </ul>
           
          </div>
          <div
            className="print-wrap page2"
            id="part2"
            style={{ padding: "0px 1in" }}
          >
             <h6>III. TÌNH TRẠNG MẪU GỬI</h6>
            <p style={{ textIndent: "40px" }}>
              Không có mẫu gửi. Cơ Quan Cảnh Sát Điều Tra Công An Huyện Hóc Môn
              - Thành Phố Hồ Chí Minh trực tiếp dẫn đương sự đến lấy mẫu tại
              Trung Tâm Pháp Y.
            </p>

            <h6>IV. PHẦN&nbsp;THU MẪU</h6>
            <p style={{ textIndent: "40px" }}>
              Trung Tâm Pháp Y thành phố Hồ Chí Minh đã tiến hành thu mẫu:{" "}
            </p>
            <p style={{ textAlign: "center" }}>Bảng thông tin mẫu đương sự </p>
            <table className="table table-bordered">
              <tbody>
                <tr style={{ textAlign: "center" }}>
                  <td>STT</td>
                  <td>Họ và tên đương sự</td>
                  <td>Loại mẫu</td>
                  <td>Ngày giờ thu mẫu</td>
                  <td>Nơi lấy mẫu</td>
                </tr>
                {dataSample.map((a, i) => {
                  return (
                    <tr key={i}>
                      <td style={{ textAlign: "center" }}>{i + 1}</td>
                      <td>{dataLitigant.data.Name}</td>
                      <td>{a.data.GDGSignal}</td>
                      <td>
                        {moment(a.data.ReceiveDate).format(
                          "hh [giờ] mm [phút] , [ngày] DD [tháng] MM [năm] YYYY"
                        )}
                      </td>
                      <td>{a.data.Deliverer}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p style={{ textIndent: "40px" }}>- Mô tả:</p>
            <ul className="description-table" style={{ marginLeft: "55px" }}>
              <li>
                Mẫu phết dịch âm đạo được thu bằng tăm bông vô trùng, loại que
                nhựa, cán đỏ, dài 26,5 cm, tình trạng ướt, màu nâu đỏ toàn que,
                số lượng 02 que.
              </li>
              <li>
                Mẫu phết vùng hậu môn được thu bằng tăm bông vô trùng, loại que
                nhựa, cán đỏ, dài 26,5 cm, tình trạng khô, màu nâu đỏ, số lượng
                02 que
              </li>
            </ul>
            <h6>V. PHẦN GIÁM ĐỊNH:</h6>
            <p style={{ textIndent: "40px" }}>
              1. Mẫu phân tích: Mẫu phết dịch âm đạo và phết vùng hậu môn.
            </p>
            <p style={{ textAlign: "center" }}>
              Bảng mã hóa các loại mẫu giám định
            </p>
            <p style={{ textIndent: "40px" }}>
              2. Phương pháp phân tích: Giám định ADN đối với tinh dịch.{" "}
            </p>
            <p style={{ textIndent: "40px" }}>3. Kết quả phân tích: </p>
            <p style={{ textIndent: "55px" }}>
              Trong 22 vùng STR khảo sát, chúng tôi nhận thấy:{" "}
            </p>
            <ul className="join-table" style={{ marginLeft: "55px" }}>
              <li>Đối với mẫu 1.155-2019-pSV1: hiện diện 7 vùng. </li>
              <li>Đối với mẫu 1.155-2019-sSV1: hiện diện 14 vùng. </li>
              <li>Đối với mẫu 1.155-2019-pSB2: hiện diện 22 vùng.</li>
              <li>Đối với mẫu 1.155-2019-sSB2: hiện diện 3 vùng.</li>
            </ul>
            
            
          </div>
 {/* PAGE 3 */}
          <div className="print-wrap page3"
            id="part3"
            style={{ padding: "50px 1in" }}>
<h6>VI. PHẦN KẾT LUẬN:</h6>
            {/* <TextareaAutosize
style={{width:"100%",marginLeft:"40px",fontStyle:"italic"}}
  placeholder='Viết kết luận ở đây !'
/> */}
            <textarea id="removethis" placeholder="Nhập kết luận tại đây !" style={{marginLeft:"40px", width:"100%",minHeight:"100px"}} />
            <ul
              id="dayne"
              className="join-table"
              style={{ marginLeft: "40px" }}
            >
              {/* <li>
                Trong mẫu phết dịch âm đạo của ... Thúy Trang có hiện diện ADN
                người nam nhưng không đủ làm cơ sở so sánh đối chiếu với ADN của
                đối tượng
              </li>
              <li>
                Trong mẫu phết vùng hậu môn của ... Thúy Trang có hiện diện ADN
                người nam; đủ làm cơ sở so sánh đối chiếu với ADN của đối tượng.
              </li> */}
            </ul>
            <div
              className="d-flex signal justify-content-around"
              style={{ height: "200px" }}
            >
              <div>
                <h6>GIÁM ĐỊNH VIÊN</h6>
              </div>
              <div>
                <h6>GIÁM ĐỐC</h6>
              </div>
            </div>
            <div
              className="d-flex justify-content-around"
              style={{ height: "200px" }}
            >
              <div>
                <h6>Đặng Mai Anh Tuấn</h6>
              </div>
              <div>
                <h6>Phan Văn Hiếu</h6>
              </div>
            </div>

            </div>


          {/* PAGE 4 */}

          <div
            className="print-wrap page4"
            id="part4"
            style={{ padding: "50px 1in" }}
          >
            <p style={{ textAlign: "left" }}>Bản ảnh đính kèm</p>
            <p style={{ textAlign: "left",textIndent:"40px" }}>
            Hình ảnh về mẫu vật giám định: 
            </p>
            <div>
            {dataSample.map((z,i) => {
            if(z.data.Images) {
              return z.data.Images.map((x,i) => {
                return <img src={x} alt="dsadas" style={{width:200, height:200}} />
              })
            }
         
            })
          }
            </div>
            
          </div>
          <div
            className="print-wrap page5"
            id="part5"
            style={{ padding: "50px 1in" }}
          >
 <p style={{ textAlign: "center" }}>Phụ lục</p>
            <p style={{ textAlign: "center" }}>
              Bảng thể hiện hồ sơ ADN trên nhiễm sắc thể Y của mẫu.
            </p>
            <table className="table-custom2">
              <tbody>
                <tr>
                  {this.state.label.map((a, i) => {
                    return a.map((b, i) => {
                      return (
                        <td key={i}>
                          <span>{b[0]}</span>
                        </td>
                      );
                    });
                  })}
                </tr>
                {this.state.test.map((a, i) => {
                  return (
                    <tr key={i} style={{ textAlign: "center" }}>
                      {a.map((b, i) => {
                        return <td key={i}>{b[1]}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>



          </div>
        
        </div>
        {/* </div>
        </div> */}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    resultstepbysampleid: state.resultstepbysampleid
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetResultStepBySampleId: (litigantId, sampleId) => {
      dispatch(getResultStepBySampleIdRequestV2(litigantId, sampleId));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardGenerateConclusion);
