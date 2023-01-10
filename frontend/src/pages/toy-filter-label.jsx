
// // const names = [
// //   "Oliver Hansen",
// //   "Van Henry",
// //   "April Tucker",
// //   "Ralph Hubbard",
// //   "Omar Alexander",
// //   "Carlos Abbott",
// //   "Miriam Wagner",
// //   "Bradley Wilkerson",
// //   "Virginia Andrews",
// //   "Kelly Snyder",
// // ];



// export function ToyFilterLabel() {
//   const theme = useTheme();
//   const [labelName, setLabelName] = React.useState([]);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setLabelName(
//       // On autofill we get a stringified value.
//       typeof value === "string" ? value.split(",") : value
//     );
//   };

//   return (
//     <div>
// <FormControl sx={{ m: 1, width: 300 }}>
//         <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
//         <Select
//           labelId="demo-multiple-chip-label"
//           id="demo-multiple-chip"
//           multiple
//           value={labelName}
//           onChange={handleChange}
//           input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
//           renderValue={(selected) => (
//             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//               {selected.map((value) => (
//                 <Chip key={value} label={value} />
//               ))}
//             </Box>
//           )}
//           MenuProps={MenuProps}
//         >
//           {labels.map((label) => (
//             <MenuItem
//               key={label}
//               value={label}
//               style={getStyles(label, label, theme)}
//             >
//               {label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }
