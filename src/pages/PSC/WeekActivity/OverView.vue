<template>
  <q-page padding v-if="loaded">
    <div class="q-pa-lg q-gutter-lg">
      <div class="row content-start">
        <div class="col-12">
          <p
            class="text-bold text-grey-8 text-uppercase text-subtitle1 q-mb-sm q- q-pl-none"
          >CHECK OUT THIS WEEK TOPIC</p>
          <q-parallax :src="weekActivity.coverPhoto">
            <template v-slot:content="scope">
              <div class="full-width full-height q-pa-xl">
                <h1 class="gt-sm q-mb-sm text-white text-bold">{{weekActivity.name}}</h1>
                <h4 class="lt-md q-mb-sm text-secondary text-bold">{{weekActivity.name}}</h4>

                <q-btn
                  color="secondary text-black"
                  size="lg"
                  :to="'/psc/lesson/'+weekActivity.lessonId"
                  label="Get Started"
                />
              </div>
            </template>
          </q-parallax>
        </div>
        <div class="q-pt-md col-xs-12 col-md-2">
          <p
            class="text-bold text-grey-8 text-uppercase text-subtitle1 q-mb-sm q- q-pl-none"
          >Progress</p>
          <level-summuary />
          <achievement-summuary />
          <side-ranking-view />
        </div>
        <div class="q-pt-md col-xs-12 col-md-10 q-pl-lg">
          <div
            class="q-pl-md text-bold text-grey-8 text-uppercase text-subtitle1 q-mb-sm"
          >Recent Activity</div>
          <div class="row">
            <div
              class="col-4 q-mt-none q-pb-md q-pl-md"
              v-for="(item) in allPublicLessons.slice(0,3)"
              :key="item.order"
            >
              <activity-preview isPreview :lesson="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
  <div v-else />
</template>

<script>
import LevelSummuary from "components/WeekActivity/LevelSummuary";
import AchievementSummuary from "components/WeekActivity/AchievementSummuary";
import SideRankingView from "components/WeekActivity/SideRankingView";
import ActivityPreview from "components/WeekActivity/ActivityPreview";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "OverView",
  computed: {
    ...mapGetters({
      allPublicLessons: "lessonStore/allPublicLessonsGetter",
      weekActivity: "lessonStore/weekActivityGetter"
    })
  },
  components: {
    LevelSummuary,
    AchievementSummuary,
    SideRankingView,
    ActivityPreview
  },
  methods: {
    ...mapActions({
      loadProgress: "progressStore/loadProgress"
    })
  },
  mounted() {
    this.loadProgress();
  },
  data() {
    return {
      progress: 0.15,
      ranking_dialog: false,
      loaded: true
    };
  }
};
</script>

<style>
</style>
