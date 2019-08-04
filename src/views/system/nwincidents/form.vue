<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="Fault clearance time" >
        <el-input v-model="form.faultclearancetime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Fault contractor ticketno" >
        <el-input v-model="form.faultcontractorticketno" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Fault customer name" >
        <el-input v-model="form.faultcustomername" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Fault customer response time" >
        <el-input v-model="form.faultcustomerresponsetime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Fault description" >
        <el-input v-model="form.faultdescription" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Fault excused outage type1" >
        <el-input v-model="form.faultexcusedoutagetype1" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Fault excusedoutage type1 end time" >
        <el-input v-model="form.faultexcusedoutagetype1endtime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Fault excused outage type1 start time" >
        <el-input v-model="form.faultexcusedoutagetype1starttime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Fault excused outage type2" >
        <el-input v-model="form.faultexcusedoutagetype2" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Fault excused outage type2 end time" >
        <el-input v-model="form.faultexcusedoutagetype2endtime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Fault excused outage type2 start time" >
        <el-input v-model="form.faultexcusedoutagetype2starttime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Fault excused outage type3" >
        <el-input v-model="form.faultexcusedoutagetype3" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Fault excused outage type3 endtime" >
        <el-input v-model="form.faultexcusedoutagetype3endtime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Fault excusedoutagetype3starttime" >
        <el-input v-model="form.faultexcusedoutagetype3starttime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="fault incident id" >
        <el-input v-model="form.faultincidentid" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="fault link site a" >
        <el-input v-model="form.faultlinksitea" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="fault link site b" >
        <el-input v-model="form.faultlinksiteb" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="fault location" >
        <el-input v-model="form.faultlocation" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="fault occurrence time" >
        <el-input v-model="form.faultoccurrencetime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="fault priority" >
        <el-input v-model="form.faultpriority" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="fault responsibility" >
        <el-input v-model="form.faultresponsibility" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="fault site id" >
        <el-input v-model="form.faultsiteid" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="fault site name" >
        <el-input v-model="form.faultsitename" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="fault ticketno" >
        <el-input v-model="form.faultticketno" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="fault ticket opentime" >
        <el-input v-model="form.faultticketopentime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="fault type" >
        <el-input v-model="form.faulttype" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="is fault excused outages reported" >
        <el-input v-model="form.isfaultexcusedoutagesreported" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="is fault origin" >
        <el-input v-model="form.isfaultorigin" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="resubmission" >
        <el-input v-model="form.resubmission" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="timestamp" >
        <el-input v-model="form.timestamp" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="username" >
        <el-input v-model="form.username" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="incidentsId" >
        <el-input v-model="form.incidentsId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="daysinmonth" >
        <el-input v-model="form.daysinmonth" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="faultadditionaldetails" >
        <el-input v-model="form.faultadditionaldetails" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="faultcontractorticketid" >
        <el-input v-model="form.faultcontractorticketid" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="faultcountry" >
        <el-input v-model="form.faultcountry" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="faultsitedeactivationdate" >
        <el-input v-model="form.faultsitedeactivationdate" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="faultsitelcprorateddays" >
        <el-input v-model="form.faultsitelcprorateddays" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="faultsiteproduct" >
        <el-input v-model="form.faultsiteproduct" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="faultsiteprotectionstatus" >
        <el-input v-model="form.faultsiteprotectionstatus" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="faultsiteprotectionstatusdate" >
        <el-input v-model="form.faultsiteprotectionstatusdate" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="faultsiteservicecommencementdate" >
        <el-input v-model="form.faultsiteservicecommencementdate" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="faultsitesla" >
        <el-input v-model="form.faultsitesla" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="faultsiteisbillable" >
        <el-input v-model="form.faultsiteisbillable" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/nwIncidents'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        faultclearancetime: '',
        faultcontractorticketno: '',
        faultcustomername: '',
        faultcustomerresponsetime: '',
        faultdescription: '',
        faultexcusedoutagetype1: '',
        faultexcusedoutagetype1endtime: '',
        faultexcusedoutagetype1starttime: '',
        faultexcusedoutagetype2: '',
        faultexcusedoutagetype2endtime: '',
        faultexcusedoutagetype2starttime: '',
        faultexcusedoutagetype3: '',
        faultexcusedoutagetype3endtime: '',
        faultexcusedoutagetype3starttime: '',
        faultincidentid: '',
        faultlinksitea: '',
        faultlinksiteb: '',
        faultlocation: '',
        faultoccurrencetime: '',
        faultpriority: '',
        faultresponsibility: '',
        faultsiteid: '',
        faultsitename: '',
        faultticketno: '',
        faultticketopentime: '',
        faulttype: '',
        isfaultexcusedoutagesreported: '',
        isfaultorigin: '',
        resubmission: '',
        timestamp: '',
        username: '',
        incidentsId: '',
        daysinmonth: '',
        faultadditionaldetails: '',
        faultcontractorticketid: '',
        faultcountry: '',
        faultsitedeactivationdate: '',
        faultsitelcprorateddays: '',
        faultsiteproduct: '',
        faultsiteprotectionstatus: '',
        faultsiteprotectionstatusdate: '',
        faultsiteservicecommencementdate: '',
        faultsitesla: '',
        faultsiteisbillable: ''
      },
      rules: {
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        faultclearancetime: '',
        faultcontractorticketno: '',
        faultcustomername: '',
        faultcustomerresponsetime: '',
        faultdescription: '',
        faultexcusedoutagetype1: '',
        faultexcusedoutagetype1endtime: '',
        faultexcusedoutagetype1starttime: '',
        faultexcusedoutagetype2: '',
        faultexcusedoutagetype2endtime: '',
        faultexcusedoutagetype2starttime: '',
        faultexcusedoutagetype3: '',
        faultexcusedoutagetype3endtime: '',
        faultexcusedoutagetype3starttime: '',
        faultincidentid: '',
        faultlinksitea: '',
        faultlinksiteb: '',
        faultlocation: '',
        faultoccurrencetime: '',
        faultpriority: '',
        faultresponsibility: '',
        faultsiteid: '',
        faultsitename: '',
        faultticketno: '',
        faultticketopentime: '',
        faulttype: '',
        isfaultexcusedoutagesreported: '',
        isfaultorigin: '',
        resubmission: '',
        timestamp: '',
        username: '',
        incidentsId: '',
        daysinmonth: '',
        faultadditionaldetails: '',
        faultcontractorticketid: '',
        faultcountry: '',
        faultsitedeactivationdate: '',
        faultsitelcprorateddays: '',
        faultsiteproduct: '',
        faultsiteprotectionstatus: '',
        faultsiteprotectionstatusdate: '',
        faultsiteservicecommencementdate: '',
        faultsitesla: '',
        faultsiteisbillable: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
