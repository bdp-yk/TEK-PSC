<template>
  <q-page style="background-color:#000000">
    <q-ajax-bar ref="bar" position="bottom" color="accent" size="10px" skip-hijack />
    <!-- content -->
    <div class="q-gutter-md">
      <div class="row justify-between">
        <q-parallax class="window-height">
          <template v-slot:media>
            <video poster="statics/brand-modern-alt.png" style="width:100vh; " autoplay loop muted>
              <source type="video/mp4" src="statics/media/montage-acm.mp4" />
            </video>
            <div class="overlay"></div>
          </template>
          <h2 class="q-mx-xl q-mb-none text-secondary text-bold">{{$t("landing_1")}}</h2>
          <h4 class="q-mx-xl q-mb-none text-white">{{$t("landing_2")}}</h4>
          <!-- <q-btn
            color="secondary"
            @click="goTo('/psc/week-activity-overview')"
            text-color="black"
            size="lg"
            replace
            :label="$t('landing_3')"
          />-->
        </q-parallax>
      </div>
    </div>

    <div class="q-pa-md q-gutter-md">
      <div class="row justify-between">
        <div class="col-xs-12 col-md-6 q-pa-xl">
          <h2 class="text-secondary text-bold">{{$t("landing_4")}}</h2>
          <h4 class="text-secondary q-mb-none">{{$t("landing_5")}}</h4>
          <p class="text-white text-h5">{{$t("landing_6")}}</p>
          <h4 class="text-secondary q-mb-none">{{$t("landing_7")}}</h4>
          <p class="text-white text-h5">{{$t("landing_8")}}</p>
          <h4 class="text-secondary q-mb-none">{{$t("landing_9")}}</h4>
          <p class="text-white text-h5">{{$t("landing_10")}}</p>
        </div>
        <div class="col-xs-12 col-md-6">
          <q-img :ratio="1" src="statics/media/upsolve-2019.jpg" />
          <!-- <q-img src=""/> -->
        </div>
      </div>
    </div>
    <div class="q-gutter-md">
      <div class="row justify-between">
        <q-parallax class="window-height">
          <template v-slot:media>
            <img src="statics/media/upsolve-2019-2.jpg" />
            <div class="overlay"></div>
          </template>
          <h2 class="q-mx-xl q-mb-none text-secondary text-bold">{{$t("landing_11")}}</h2>
          <h4 class="q-mx-xl q-mb-none text-white text-uppercase">{{$t("landing_12")}}</h4>
          <!-- <q-btn
            color="secondary"
            @click="goTo('/psc/week-activity-overview')"
            replace
            text-color="black"
            size="lg"
            :label="$t('landing_13')"
          />-->
        </q-parallax>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LandingPage",
  computed: {
    ...mapState({
      authStore: "authStore"
    })
  },
  data() {
    return {
      icon: false,
      yesNoWtf: {}
    };
  },
  methods: {
    // we manually trigger it (this is not needed if we
    // don't skip Ajax calls hijacking)
    trigger() {
      const bar = this.$refs.bar;

      // bar.start();
      // this.$axios("https://yesno.wtf/api").then(r => {
      //   this.yesNoWtf = r.data;
      //   this.$refs.bar.stop();
      // });
    },
    goTo(link) {
      if (this.authStore.loggedIn) {
        this.$router.push("link");
      } else {
        this.$q.notify("Login to Proceed");
      }
    }
  }
};
</script>

<style>
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #131c25;
  opacity: 0.5;
}
</style>
