<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 订单列表 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="搜索">
                        <el-input v-model.trim="query.search" placeholder="请输入手机号进行搜索" class="handle-input mr10"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header" align="center">
                <el-table-column label="序号" type="index" show-overflow-tooltip width="66" align="center"> </el-table-column>

                <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
                <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                <el-table-column prop="buyType" label="会员时间" align="center"></el-table-column>
                <el-table-column prop="orderMoney" label="订单金额" align="center"></el-table-column>
                <el-table-column prop="orderId" label="订单id" align="center"></el-table-column>
                <el-table-column prop="orderNumber" label="订单编号" align="center"></el-table-column>
                <el-table-column prop="orderCreateTime" label="创建时间" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { orderList } from '../../api/index';

export default {
    name: 'orderList',
    data() {
        return {
            query: {
                search: '' //搜索
            },
            tableData: [],
            pageTotal: 0,
            pageIndex: 1,
            pageSize: 10,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            let vueData = {
                search: this.query.search,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            };
            orderList(vueData).then((res) => {
                if (res.code == 10000) {
                    this.tableData = res.data.dataList;
                    this.pageTotal = res.data.count || 10;
                }
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.pageIndex = 1;
            this.query.member = '';
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    deleteUser(row.orderId).then((res) => {
                        if (res.code == 10000) {
                            this.$message.success('删除成功');
                            this.tableData.splice(index, 1);
                        } else {
                            this.$message.success('删除失败');
                        }
                    });
                })
                .catch(() => {});
        },
        // 分页导航
        handlePageChange(val) {
            this.pageIndex = val;
            this.getData();
        },
        // 下拉框事件
        onSelectMember(e) {
            this.query.member = e;
            this.query.search = '';
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
