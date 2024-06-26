import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api.js";

export const getUser = createAsyncThunk(
  "users/getUser",
  async (accountId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`${accountId}/superAdmin/accounts`);

      console.log(response.data);
      return { accounts: response.data.accounts };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getEditUser = createAsyncThunk(
  "users/getEditUser",
  async ({ accountId, accountFocusId }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `${accountId}/superAdmin/accounts/${accountFocusId}/update`
      );
      console.log(response.data);
      return {
        editAccount: response.data.account,
        editOrganizations: response.data.organizations,
        editRoles: response.data.allRoles,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const putEditUser = createAsyncThunk(
  "users/putEditUser",
  async ({ accountId, accountFocusId, firstName,lastName, telephoneNumber, organizationList, roleId}, { rejectWithValue }) => {
    try {
      const response = await instance.put(
        `${accountId}/superAdmin/accounts/${accountFocusId}/update`, {firstName,lastName, telephoneNumber, organizationList, roleId}
      );
      console.log(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAccount = createAsyncThunk(
  "users/getAccount",
  async (accountId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`${accountId}/superAdmin/newAccount`);
      console.log(response.data);
      return { organizations: response.data.organizations, allRoles: response.data.allRoles };
    } catch (error) {
      console.log("Пиздец");
      return rejectWithValue(error.message);
    }
  }
);

export const postAccount = createAsyncThunk(
  "users/postAccount",
  async (
    { accountId, firstName, lastName, telephoneNumber, organizationList, roleId },
    { rejectWithValue }
  ) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.post(`${accountId}/superAdmin/newAccount`, {
        firstName,
        lastName,
        telephoneNumber,
        organizationList,
        roleId
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Пиздец");
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    organizations: [],
    editAccount: [],
    editOrganizations: [],
    editRoles: [],
    allRoles: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getUser
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "resolved";
        state.users = action.payload.accounts;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      //getEditUser
      .addCase(getEditUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getEditUser.fulfilled, (state, action) => {
        state.status = "resolved";
        state.editAccount = action.payload.editAccount;
        state.editOrganizations = action.payload.editOrganizations;
        state.editRoles = action.payload.editRoles;
      })
      .addCase(getEditUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      //getAccount
      .addCase(getAccount.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.status = "resolved";
        state.organizations = action.payload.organizations;
        state.allRoles = action.payload.allRoles;
      })
      .addCase(getAccount.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
