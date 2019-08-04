<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 新增 -->
      <div style="display: inline-block;margin: 0px 2px;">
        <el-button
          v-permission="['ADMIN','NWINCIDENTS_ALL','NWINCIDENTS_CREATE']"
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="add">{{ $t('add') }}</el-button>
      </div>
    </div>
    <!--表单组件-->
    <eForm ref="form" :is-add="isAdd"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="id" label="id"/>
      <el-table-column prop="faultclearancetime" label="faultclearancetime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.faultclearancetime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="faultcontractorticketno" label="fault contractor ticketno"/>
      <el-table-column prop="faultcustomername" label="fault customer name"/>
      <el-table-column prop="faultcustomerresponsetime" label="fault customer response time"/>
      <el-table-column prop="faultdescription" label="faultdescription"/>
      <el-table-column prop="faultexcusedoutagetype1" label="faultexcusedoutagetype1"/>
      <el-table-column prop="faultexcusedoutagetype1endtime" label="faultexcusedoutagetype1endtime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.faultexcusedoutagetype1endtime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="faultexcusedoutagetype1starttime" label="faultexcusedoutagetype1starttime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.faultexcusedoutagetype1starttime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="faultexcusedoutagetype2" label="faultexcusedoutagetype2"/>
      <el-table-column prop="faultexcusedoutagetype2endtime" label="faultexcusedoutagetype2endtime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.faultexcusedoutagetype2endtime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="faultexcusedoutagetype2starttime" label="faultexcusedoutagetype2starttime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.faultexcusedoutagetype2starttime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="faultexcusedoutagetype3" label="faultexcusedoutagetype3"/>
      <el-table-column prop="faultexcusedoutagetype3endtime" label="faultexcusedoutagetype3endtime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.faultexcusedoutagetype3endtime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="faultexcusedoutagetype3starttime" label="faultexcusedoutagetype3starttime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.faultexcusedoutagetype3starttime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="faultincidentid" label="faultincidentid"/>
      <el-table-column prop="faultlinksitea" label="faultlinksitea"/>
      <el-table-column prop="faultlinksiteb" label="faultlinksiteb"/>
      <el-table-column prop="faultlocation" label="faultlocation"/>
      <el-table-column prop="faultoccurrencetime" label="faultoccurrencetime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.faultoccurrencetime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="faultpriority" label="faultpriority"/>
      <el-table-column prop="faultresponsibility" label="faultresponsibility"/>
      <el-table-column prop="faultsiteid" label="faultsiteid"/>
      <el-table-column prop="faultsitename" label="faultsitename"/>
      <el-table-column prop="faultticketno" label="faultticketno"/>
      <el-table-column prop="faultticketopentime" label="faultticketopentime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.faultticketopentime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="faulttype" label="faulttype"/>
      <el-table-column prop="isfaultexcusedoutagesreported" label="isfaultexcusedoutagesreported"/>
      <el-table-column prop="isfaultorigin" label="isfaultorigin"/>
      <el-table-column prop="resubmission" label="resubmission"/>
      <el-table-column prop="timestamp" label="timestamp">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.timestamp) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="username"/>
      <el-table-column prop="incidentsId" label="incidentsId"/>
      <el-table-column prop="daysinmonth" label="daysinmonth"/>
      <el-table-column prop="faultadditionaldetails" label="faultadditionaldetails"/>
      <el-table-column prop="faultcontractorticketid" label="faultcontractorticketid"/>
      <el-table-column prop="faultcountry" label="faultcountry"/>
      <el-table-column prop="faultsitedeactivationdate" label="faultsitedeactivationdate"/>
      <el-table-column prop="faultsitelcprorateddays" label="faultsitelcprorateddays"/>
      <el-table-column prop="faultsiteproduct" label="faultsiteproduct"/>
      <el-table-column prop="faultsiteprotectionstatus" label="faultsiteprotectionstatus"/>
      <el-table-column prop="faultsiteprotectionstatusdate" label="faultsiteprotectionstatusdate"/>
      <el-table-column prop="faultsiteservicecommencementdate" label="faultsiteservicecommencementdate"/>
      <el-table-column prop="faultsitesla" label="faultsitesla"/>
      <el-table-column prop="faultsiteisbillable" label="faultsiteisbillable"/>
      <el-table-column v-if="checkPermission(['ADMIN','NWINCIDENTS_ALL','NWINCIDENTS_EDIT','NWINCIDENTS_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <el-button v-permission="['ADMIN','NWINCIDENTS_ALL','NWINCIDENTS_EDIT']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"/>
          <el-popover
            v-permission="['ADMIN','NWINCIDENTS_ALL','NWINCIDENTS_DELETE']"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page + 1"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/nwIncidents'
import { parseTime } from '@/utils/index'
import eForm from './form'
export default {
  components: { eForm },
  mixins: [initData],
  data() {
    return {
      delLoading: false
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/nwIncidents'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.dleChangePage()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
    add() {
      this.isAdd = true
      this.$refs.form.dialog = true
    },
    edit(data) {
      this.isAdd = false
      const _this = this.$refs.form
      _this.form = {
        id: data.id,
        faultclearancetime: data.faultclearancetime,
        faultcontractorticketno: data.faultcontractorticketno,
        faultcustomername: data.faultcustomername,
        faultcustomerresponsetime: data.faultcustomerresponsetime,
        faultdescription: data.faultdescription,
        faultexcusedoutagetype1: data.faultexcusedoutagetype1,
        faultexcusedoutagetype1endtime: data.faultexcusedoutagetype1endtime,
        faultexcusedoutagetype1starttime: data.faultexcusedoutagetype1starttime,
        faultexcusedoutagetype2: data.faultexcusedoutagetype2,
        faultexcusedoutagetype2endtime: data.faultexcusedoutagetype2endtime,
        faultexcusedoutagetype2starttime: data.faultexcusedoutagetype2starttime,
        faultexcusedoutagetype3: data.faultexcusedoutagetype3,
        faultexcusedoutagetype3endtime: data.faultexcusedoutagetype3endtime,
        faultexcusedoutagetype3starttime: data.faultexcusedoutagetype3starttime,
        faultincidentid: data.faultincidentid,
        faultlinksitea: data.faultlinksitea,
        faultlinksiteb: data.faultlinksiteb,
        faultlocation: data.faultlocation,
        faultoccurrencetime: data.faultoccurrencetime,
        faultpriority: data.faultpriority,
        faultresponsibility: data.faultresponsibility,
        faultsiteid: data.faultsiteid,
        faultsitename: data.faultsitename,
        faultticketno: data.faultticketno,
        faultticketopentime: data.faultticketopentime,
        faulttype: data.faulttype,
        isfaultexcusedoutagesreported: data.isfaultexcusedoutagesreported,
        isfaultorigin: data.isfaultorigin,
        resubmission: data.resubmission,
        timestamp: data.timestamp,
        username: data.username,
        incidentsId: data.incidentsId,
        daysinmonth: data.daysinmonth,
        faultadditionaldetails: data.faultadditionaldetails,
        faultcontractorticketid: data.faultcontractorticketid,
        faultcountry: data.faultcountry,
        faultsitedeactivationdate: data.faultsitedeactivationdate,
        faultsitelcprorateddays: data.faultsitelcprorateddays,
        faultsiteproduct: data.faultsiteproduct,
        faultsiteprotectionstatus: data.faultsiteprotectionstatus,
        faultsiteprotectionstatusdate: data.faultsiteprotectionstatusdate,
        faultsiteservicecommencementdate: data.faultsiteservicecommencementdate,
        faultsitesla: data.faultsitesla,
        faultsiteisbillable: data.faultsiteisbillable
      }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>

</style>
