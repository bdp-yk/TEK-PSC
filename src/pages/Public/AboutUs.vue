<template>
  <div class="row justify-center">
    <q-img
      @mouseenter="showLayer=true"
      @mouseleave="showLayer=false"
      src="statics/media/acm-tek-up-cover.png"
    ></q-img>
    <div style="top:-25vh;position:relative; width:75%" class="row bg-primary q-mx-xl q-pa-xl">
      <q-timeline color="secondary" dark>
        <q-timeline-entry heading>About TEK-UP and ACM-TEK-UP</q-timeline-entry>

        <q-timeline-entry
          title="TEK-UP University"
          icon="account_balance"
          subtitle="Hosting University"
        >
          <div>{{AboutUS.tek_up}}</div>
        </q-timeline-entry>

        <q-timeline-entry title="TEK-PS Bootcamp" subtitle="Hosting Club" icon="thumbs_up_down">
          <div v-html="AboutUS.tek_ps"></div>
        </q-timeline-entry>

        <q-timeline-entry heading>About TEK-PS BootCamp</q-timeline-entry>

        <q-timeline-entry
          title="Why would I?"
          subtitle="Why is it important to learn problem-solving skills"
          icon="how_to_reg"
        >
          <div>{{AboutUS.why_ps}}</div>
        </q-timeline-entry>

        <q-timeline-entry
          title="If you hesitate about it... then It is worth it"
          subtitle="OK, but..."
        >
          <div>{{AboutUS.goal_after}}</div>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </div>
</template>
<script>
import AboutUS from "../../utils/aboutUs";
export default {
  name: "AboutUs",
  data() {
    return {
      AboutUS
    };
  }
};
</script>

<style>
</style>
