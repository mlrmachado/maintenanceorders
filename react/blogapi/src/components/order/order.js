import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../axios";
import { useParams } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import {
  Container,
  Typography,
  Grid,
  TextField,
  CssBaseline,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Button,
} from "@material-ui/core/";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import "date-fns";
import ButtonBack from "../buttonBack";

export default function Post() {
  const { id } = useParams();

  const initialFormDataCategory = Object.freeze([
    {
      id: "",
      value: "",
    },
  ]);

  const [formDataCategory, updateFormDataCategory] = useState(
    initialFormDataCategory
  );

  useEffect(() => {
    axiosInstance.get("listcategories/").then((res) => {
      updateFormDataCategory(res.data);
    });
  }, [updateFormDataCategory]);

  const [categoryValue, setCategoryValue] = React.useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());

  const history = useHistory();

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const initialFormData = Object.freeze({
    name: "",
    phone: "",
    agency: "",
    description: "",
    company: "",
    deadline: "",
    category: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    /* eslint-disable */
    Date.prototype.addHours = function (h) {
      this.setTime(this.getTime() + h * 60 * 60 * 1000);
      return this;
    };
    /* eslint-enable */
    selectedDate.addHours(-3); // workaround for the fuso GMT -3
    if (id) {
      e.preventDefault();
      console.log(formData);

      axiosInstance.put(`order/edit/` + id, {
        name: formData.name,
        phone: formData.phone,
        agency: formData.agency,
        description: formData.description,
        company: formData.company,
        category: categoryValue,
        deadline: selectedDate.toISOString(),
      });
      history.push({
        pathname: "/",
      });
      window.location.reload(); // Update Order
    } else {
      e.preventDefault();
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      let formDataNovo = new FormData();
      formDataNovo.append("name", formData.name);
      formDataNovo.append("phone", formData.phone);
      formDataNovo.append("agency", formData.agency);
      formDataNovo.append("description", formData.description);
      formDataNovo.append("company", formData.company);
      formDataNovo.append("category", categoryValue);
      formDataNovo.append("deadline", selectedDate.toISOString());
      axiosInstance
        .post(`order/create/`, formDataNovo, config)
        .then((res) => {
          if (res.status === 200) {
            history.push({ pathname: "/" });
            window.location.reload();
          } else {
            alert(res.status + " " + res.statusText);
          }
        })
        .catch((error) => {
          if (error.message) {
            alert(error);
          }
        });
    }
  };

  useEffect(() => {
    axiosInstance.get("order/" + id).then((res) => {
      updateFormData(res.data);
      console.log(res.data);
      setCategoryValue(res.data.category);
      setSelectedDate(new Date(res.data.deadline.replace("Z", "-03:00")));
    });
    /* eslint-disable */
  }, [updateFormData]);
  /* eslint-enable */
  const handleChangeCategory = (event) => {
    setCategoryValue(event.target.value);
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box m={5}></Box>
      <Container maxWidth="md">
        <ButtonBack />
        <form noValidate>
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>
          <Box m={5}></Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
              <TextField
                required
                id="name"
                name="name"
                label="Contact Name"
                fullWidth
                autoComplete="given-name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="phone"
                name="phone"
                label="Contact Phone"
                fullWidth
                value={formData.phone}
                autoComplete="given-phone"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="agency"
                name="agency"
                label="Real State Agency"
                fullWidth
                value={formData.agency}
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                id="description"
                name="description"
                label="Order Description"
                multiline
                rows={4}
                fullWidth
                value={formData.description}
                variant="outlined"
                helperText="Please provide the order description as needed"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                id="company"
                name="company"
                label="Company"
                fullWidth
                value={formData.company}
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="ordercategorylabel">
                  Select the Order Category
                </InputLabel>
                <Select
                  labelId="ordercategory"
                  id="ordercategory"
                  //value={formData.category}
                  value={categoryValue}
                  label="Select the Order Category"
                  onChange={handleChangeCategory}
                >
                  {formDataCategory.map((option) => (
                    <MenuItem value={option.id}>{option.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} sm={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  inputVariant="outlined"
                  label="Deadline"
                  labelId="deadline"
                  id="deadline"
                  format="dd/MM/yyyy hh:mm aa"
                  name="startDate"
                  value={selectedDate}
                  onChange={handleDateChange}
                  variant="outlined"
                  fullWidth
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Box m={4}></Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            {id ? "Save Edit" : "Save new order"}
          </Button>
        </form>
      </Container>{" "}
    </Container>
  );
}
