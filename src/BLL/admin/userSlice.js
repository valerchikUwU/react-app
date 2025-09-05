import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api.js";

export const getUser = createAsyncThunk(
  "order/getUser",
  async (accountId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`${accountId}/accounts`);

      console.log(response.data);
      return { accounts: response.data.accounts };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getEditUser = createAsyncThunk(
  "order/getEditUser",
  async ({ accountId, accountFocusId }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `${accountId}/accounts/${accountFocusId}/update`
      );
      console.log(response.data);
      return {
        editAccount: response.data.account,
        editOrganizations: response.data.organizations,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const putEditUser = createAsyncThunk(
  "order/putEditUser",
  async (
    {
      accountId,
      accountFocusId,
      firstName,
      lastName,
      telephoneNumber,
      organizationList,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await instance.put(
        `${accountId}/accounts/${accountFocusId}/update`,
        { firstName, lastName, telephoneNumber, organizationList }
      );
      console.log(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrganizationList = createAsyncThunk(
  "order/getOrganizationList",
  async (accountId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`${accountId}/newAccount`);
      console.log(response.data);
      return { organizations: response.data.organizations };
    } catch (error) {
      console.log("Пиздец");
      return rejectWithValue(error.message);
    }
  }
);

export const postAccount = createAsyncThunk(
  "order/putAccount",
  async (
    { accountId, firstName, lastName, telephoneNumber, organizationList },
    { rejectWithValue }
  ) => {
    try {
      // Используем шаблонные строки для динамического формирования URL
      const response = await instance.post(`${accountId}/newAccount`, {
        firstName,
        lastName,
        telephoneNumber,
        organizationList,
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
    status: null,
    error: null,
    errorPostAccount: null,
    errorPutEditUser: null,
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
      })
      .addCase(getEditUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      //getOrganizationList
      .addCase(getOrganizationList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getOrganizationList.fulfilled, (state, action) => {
        state.status = "resolved";
        state.organizations = action.payload.organizations;
      })
      .addCase(getOrganizationList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      //postAccount
      .addCase(postAccount.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.errorPostAccount = null;
      })
      .addCase(postAccount.fulfilled, (state, action) => {
        state.status = "resolved";
        state.errorPostAccount = 200;
      })
      .addCase(postAccount.rejected, (state, action) => {
        state.status = "rejected";
        state.errorPostAccount = "в чем-то проблема";
      })
       //putEditUser
       .addCase(putEditUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.errorPutEditUser = null;
      })
      .addCase(putEditUser.fulfilled, (state, action) => {
        state.status = "resolved";
        state.errorPutEditUser = 200;
      })
      .addCase(putEditUser.rejected, (state, action) => {
        state.status = "rejected";
        state.errorPutEditUser ="в чем-то проблема";
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
