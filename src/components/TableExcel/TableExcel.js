import React, { Component } from "react";
import "./TableExcel.css";
class TableExcel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <table className={this.props.tableClassName}>
          <tbody>
            {/* <tr>
                            {
                                this.props.columns.map((c) => 
                                    <th key={c.key} className={c.key === -1 ? this.props.tableHeaderRowClass : ""}>{c.key === -1 ? "" : c.name}</th>
                                )
                            
                            }
                        </tr> */}
            {this.props.data.map((r, i) => (
              <tr key={i}>
              <td className={this.props.tableHeaderRowClass}>
                 d  
                </td>
                {/* {this.props.columns.filter((a,i) => {
                    return a[i+1] 
                }).map((b,i) => {
                   return (
                       <p>{b}</p>
                   )
                })} */}
                {this.props.columns.map((c,i) => (
                  <td key={c.key+1}>{r[c.key+1]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableExcel;
