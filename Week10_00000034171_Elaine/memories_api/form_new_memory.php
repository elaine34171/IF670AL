<form method="POST" action="insert_new_memory.php" enctype="multipart/form-data">
    <table>
        <tr>
            <th colspan="2">NEW MEMORY</th>
        </tr>

        <tr><td><br/></td></tr>

        <tr>
            <td>Title</td> 
            <td><input type="text" name="title" style="width: 225px;"></td>
        </tr>

        <tr>
            <td>Type</td>
            <td>
                <select name="type" style="width: 225px;">
                    <option value="good" style="width: 225px;">Good Memory</option>
                    <option value="bad" style="width: 225px">Bad Memory</option>
                </select>
            </td>
        </tr>

        <tr>
            <td>Latitude</td>
            <td><input type="number" name="markerLat" step="any" style="width: 225px;"></td>
        </tr>

        <tr>
            <td>Longitude</td>
            <td><input type="number" name="markerLng" step="any" style="width: 225px;"></td>
        </tr>

        <tr>
            <td>Photo</td>
            <td><input type="file" name="photo"></td>
        </tr>

        <tr><td><br/></td></tr>

        <tr>
            <td colspan="2" style="text-align: center;"><input type="submit" name="submit" value="Add Memory"></td>
        </tr>
    </table>
</form>