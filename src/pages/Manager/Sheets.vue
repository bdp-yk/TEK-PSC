<template>
  <q-page padding>
    <!-- content -->
    <div class="fit row justify-center">
      <q-list class="rounded-borders col-xs-12 col-lg-10">
        <q-item-label header class="row items-center">
          Sheets
          <q-space />
          <q-input
            dense
            debounce="500"
            v-model="filterName"
            label="Search Contests, Rounds, Sheets by any Criteria"
            class="q-pr-md col-6"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-if="filterName!=''" v-slot:append>
              <q-icon name="close" @click="filterName = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </q-item-label>

        <q-item v-for="(sheet, index) in allSheets" :key="index">
          <q-item-section avatar top>
            <q-img v-if="sheet.fromCodeForces" src="statics/social/codeforces.png" />
            <q-img v-else src="statics/transparent-bg.png" />
          </q-item-section>

          <q-item-section top class="col-2 gt-sm">
            <q-item-label class="q-mt-sm">{{sheet.name}}</q-item-label>
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-weight-medium">[{{$moment(sheet.addedDate).format("DD-MMM")}}]</span>
              <q-badge
                v-for="(tag, ind) in sheet.tags"
                :key="ind"
                color="blue"
                class="q-mr-xs"
              >{{tag.label}}</q-badge>
            </q-item-label>
            <q-item-label caption lines="1">{{sheet.description||"No Description"}}</q-item-label>
            <q-item-label
              lines="1"
              class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
            >
              <a
                :href="sheet.link"
                target="_blank"
                class="text-caption cursor-pointer"
              >Open in CodeForces</a>
            </q-item-label>
          </q-item-section>

          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                size="12px"
                flat
                dense
                round
                @click="viewSheet(sheet)"
                type="a"
                icon="find_in_page"
              />
              <q-btn
                size="12px"
                flat
                dense
                round
                @click="myTogglePublic(sheet)"
                :icon="sheet.isPublic?'visibility':'visibility_off'"
              />
              <q-btn size="12px" flat dense round @click="modifySheet(sheet)" icon="settings" />
              <q-btn size="12px" flat dense round @click="deleteSheet(sheet)" icon="delete" />
            </div>
          </q-item-section>
        </q-item>

        <q-separator spaced />
      </q-list>
    </div>
    <!-- for debugging because dialog doesn't show its content in debugger -->
    <!-- <div v-if="sheetView" class="fit row justify-center">
      <sheet-editor :dismissModal="dismissModal" :sheet="demandedSheet" />
    </div>-->
    <q-dialog v-model="sheetView" persistent>
      <q-card style="min-width: 75vw">
        <sheet-editor :dismissModal="dismissModal" :sheet="demandedSheet" />
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDelete" persistent>
      <q-card class="bg-negative text-white" style="width:350px">
        <q-card-section class="row items-center">
          <q-avatar icon="report_problem" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete it?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Delete" @click="deleteIt()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn round color="primary" icon="add" @click="addSheet()" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import SheetEditor from "../../components/Manager/SheetEditor";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ManageSheets",
  components: { SheetEditor },
  mounted() {
    this.loadSheets();
  },
  computed: {
    ...mapGetters({
      als: "sheetStore/getAllSheets"
    })
  },
  watch: {
    filterName: function(newVal) {
      if (newVal !== "") {
        this.allSheets = this.als.filter(e =>
          this.$_.values(e)
            .toString()
            .toLowerCase()
            .includes(newVal.toLowerCase())
        );
      } else {
        if (this.$_.isEmpty(this.als)) {
          this.allSheets = [];
        } else {
          this.allSheets = this.als;
        }
      }
    }
  },
  methods: {
    ...mapActions({
      togglePublic: "sheetStore/togglePublic",
      loc_loadSheets: "sheetStore/bindSheetsRef",
      removeSheet: "sheetStore/removeSheet"
    }),
    loadSheets() {
      this.loc_loadSheets().then(r => {
        this.allSheets = this.als;
      });
    },
    deleteSheet(sh) {
      this.demandedSheet = sh;
      this.confirmDelete = true;
    },
    deleteIt() {
      this.removeSheet(this.demandedSheet);
      this.$nextTick(this.loadSheets);
      this.confirmDelete = false;
      this.demandedSheet = {};
    },
    viewSheet(sh) {
      window.open(sh.link, "_blank");
    },
    addSheet() {
      this.demandedSheet = {
        sheetId: null,
        name: "",
        description: "",
        author: "",
        link: "",
        level: "",
        addedDate: "",
        isPublic: false,
        tags: [],
        coverPhoto: "",
        fromCodeForces: true,
        includedProblems: []
      };
      this.sheetView = true;
    },
    modifySheet(sheet) {
      this.demandedSheet = sheet;
      setTimeout(() => {
        this.sheetView = true;
      }, 500);
    },
    dismissModal() {
      this.sheetView = false;
      this.$nextTick(this.loadSheets);
    },
    myTogglePublic(sh) {
      this.togglePublic(sh).then(() => {
        this.$nextTick(this.loadSheets);
      });
    }
  },
  data() {
    return {
      demandedSheet: {},
      sheetView: false,
      confirmDelete: false,
      allSheets: [],
      filterName: ""
    };
  }
};
</script>

<style>
</style>
