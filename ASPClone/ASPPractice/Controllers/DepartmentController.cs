using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Text;

namespace DefaultNamespace;

[ApiController]
[Route("api/[controller]")]
public class DepartmentController : ControllerBase
{
       private readonly IConfiguration _configuration;
        public DepartmentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"select DepartmentId,DepartmentName from Department";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBServer");
            MySqlDataReader myReader;
            using (MySqlConnection db = new MySqlConnection(sqlDataSource))
            {
                db.Open();
                using(MySqlCommand myCommand = new MySqlCommand(query, db))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    db.Close();
                }
            }
            
            return Ok(DataTableToJsonWithStringBuilder(table));
            // return new JsonResult(table);
        }
        
        [HttpPost]
        public IActionResult Post(Department dep)
        {
            string query = @"insert into Department (DepartmentName) values (@DepartmentName);";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBServer");
            MySqlDataReader myReader;
            using (MySqlConnection db = new MySqlConnection(sqlDataSource))
            {
                db.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, db))
                {
                    myCommand.Parameters.AddWithValue("@DepartmentName", dep.DepartmentName);
                    
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    db.Close();
                }
            }

            return Ok("Added Successfully");
        }
        
        [HttpPut]
        public IActionResult Put(Department dep)
        
        {
            string query = @"update Department set DepartmentName =@DepartmentName where DepartmentId=@DepartmentId;";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBServer");
            MySqlDataReader myReader;
            using (MySqlConnection db = new MySqlConnection(sqlDataSource))
            {
                db.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, db))
                {
                    myCommand.Parameters.AddWithValue("@DepartmentId", dep.DepartmentId);
                    myCommand.Parameters.AddWithValue("@DepartmentName", dep.DepartmentName);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    db.Close();
                }
            }

            return Ok("Updated Successfully");
        }
        

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            string query = @"delete from Department where DepartmentId=@DepartmentId;";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBServer");
            MySqlDataReader myReader;
            using (MySqlConnection db = new MySqlConnection(sqlDataSource))
            {
                db.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, db))
                {
                    myCommand.Parameters.AddWithValue("@DepartmentId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    db.Close();
                }
            }

            return Ok("Deleted Successfully");
        }
        
        private string DataTableToJsonWithStringBuilder(DataTable table)
        {
            var jsonString = new StringBuilder();
            if (table.Rows.Count > 0)
            {
                jsonString.Append("[");
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    jsonString.Append("{");
                    for (int j = 0; j < table.Columns.Count; j++)
                    {
                        if (j < table.Columns.Count - 1)
                        {
                            jsonString.Append("\"" + table.Columns[j].ColumnName.ToString()
                                                   + "\":" + "\""
                                                   + table.Rows[i][j].ToString() + "\",");
                        }
                        else if (j == table.Columns.Count - 1)
                        {
                            jsonString.Append("\"" + table.Columns[j].ColumnName.ToString()
                                                   + "\":" + "\""
                                                   + table.Rows[i][j].ToString() + "\"");
                        }
                    }
                    
                    if (i == table.Rows.Count - 1) jsonString.Append("}");
                    else jsonString.Append("},");
                }
                jsonString.Append("]");
            }
            return jsonString.ToString();
        }
}