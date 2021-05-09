<!DOCTYPE html>
<html>
<head>
    <title style="background-color: rgb(0, 0, 82);" >Oxygen Services Near You</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <script type="text/javascript" src="script.js"></script>
    <style>
        input, textarea{
            font-size: 12px;
            width: 25%;
            margin: 5px;
            padding: 10px;
            border: 2px solid grey;
            border-radius: 10px;
            text-align: center;
            background-color: rgb(233, 226, 255); 

        }
        .container{
            width:100%;
        }
        
        .container .right-row{
            width:50%;
            float: right;
        }
    </style>
</head>
<body>
<div class="container" >
    <h3 style="text-align: center; font-weight: bold; ">OXYGEN SERVICES</h3>
    <div class="row">
        <form class="form-horizontal" style="padding-left:30px" action="index.php" method="POST">
            <div class="form-group">
            
                <label class="col-lg-2 control-label">State</ label>
                <div class="col-1g-4">
                    <input type="text" class="form-control" name="State" placeholder="Your State">
                </div>
            </div>
            <div class="form-group">
                <label class="col-lg-2 control-label" >City</label>
                <div class="col-1g-4">
                    <input type="text" class="form-control" name="City" placeholder="Your City">
                </div>
            </div>
            <div class="form-group">
                <label class="col-lg-2 control-label">Company_Name</label>
                <div class="col-1g-4">
                    <input type="text" class="form-control" name="Company_Name" placeholder="Company Name">
                </div>
            </div>
            <div class="form-group">

                <label class="col-1g-2 control-label">Contact_Person_Name</label>
                <div class="col-1g-4">
                    <input type="text" class="form-control" name="Contact_Person_Name" placeholder="Contact Person Name">
                </div>
            </div>

            <div class="form-group">
                <label class="col-1g-2 control-label">Contact_Number</label>
                <div class="col-1g-4">
                    <input type="text" class="form-control" name="Contact_Number" placeholder="Contact Number">
                </div>
            </div>

            <div class="form-group">
                <label class="col-1g-2 control-label"></ label>
                <div class="col-1g-4">
                    <input type="submit" name="submit" class="bin btn-primary">
                </div>
            </div>
        </form>
    </div>
    <div class="right-row"><img width= 100% height= auto src="imgs/oxymeter.jpg" alt="oxymeter"></div>
    <div class="row">
        <table class="table table-striped table-hover" style="text-align: center;" margin= auto>
            <thead style="text-align: center;" margin= auto>
                <tr>
                    <th>State</th>
                    <th>City</th>
                    <th>Company_Name</th>
                    <th>Contact_Person_Name</th>
                    <th>Contact_Number</th>
                </tr>
            </thead>
        
        <tbody style="text-align: center;">
            <?php
            include ('C:\xampp\htdocs\Frosthack\db.php');
            if(isset($_POST[ 'submit' ])) {
                $State=$_POST [ 'State' ];
                $City=$_POST [ 'City' ];
                
                $Company_Name = $_POST [ 'Company_Name' ];
                $Contact_Person_Name = $_POST['Contact_Person_Name' ];
                $Contact_Number= $_POST[ 'Contact_Number' ];
                if($State!= "" || $City != "" ||  $Company_Name != "" || $Contact_Person_Name != "" || $Contact_Number != ""){
                    $query = "SELECT * FROM filters WHERE State = '$State' OR City = '$City' OR Company_Name = '$Company_Name' OR Contact_Person_Name = '$Contact_Person_Name' OR Contact_Number='$Contact_Number'";
                    $data = mysqli_query ($conn, $query) or die('error' ) ;
                    if (mysqli_num_rows ($data) > 0){

                        while($row = mysqli_fetch_assoc($data)){
                        
                            $State = $row[ 'State' ];
                            $City= $row[ 'City' ];
                            $Company_Name = $row[ 'Company_Name' ];
                            $Contact_Person_Name = $row[ 'Contact_Person_Name' ];
                            $Contact_Number= $row['Contact_Number' ];
                        ?>
                        <tr>

                            
                            <td><?php echo $State; ?></td>
                            <td><?php echo $City; ?></td>
                            <td><?php echo $Company_Name; ?></td>
                            <td><?php echo $Contact_Person_Name; ?></td>
                            <td><?php echo $Contact_Number; ?></td>
                            
                        </tr>
                        <?php
                        }
                    }
                    else{
                        ?>
                        <tr>
                            <td>Records not found</td>
                        </tr>
                        <?php
                    }
                }
            }
            ?>
        </tbody>
        </table>


</div>
</body>
</html>

