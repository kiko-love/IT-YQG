<template>
    <div class="container">
        <a-row class="grid-demo">
            <a-col :span="15">
                <div class="u-container">
                    <a-card v-if="resultShow" class="result-card">
                        <a-result status="success" title="资源上传成功">
                            <template #subtitle>
                                <div class="result-subtitle">
                                    请等待后台管理员进行审核，通过后系统自动为您推送
                                </div>
                            </template>
                            <template #extra>
                                <a-space>
                                    <a-button type='primary' status="success" @click="backRefresh">返回</a-button>
                                </a-space>
                            </template>
                        </a-result>
                    </a-card>
                    <a-card v-else :bordered="false">
                        <div class="u-upload-form">
                            <div class="u-title">上传资源</div>
                            <div v-if="file" class="file-list">
                                <div class="file-info">
                                    <div class="file-icon"><icon-file /></div>
                                    <div>
                                        <div class="file-name">{{ file?.file.name }}</div>
                                        <div class="file-size">{{ calculateUploadFileSize(file?.file.size) }}</div>
                                    </div>
                                </div>
                                <div class="file-action">
                                    <a-button @click="delFile" shape="circle">
                                        <template #icon>
                                            <icon-delete />
                                        </template>
                                    </a-button>
                                </div>
                            </div>
                            <a-upload v-else :fileList="file ? [file] : []" :limit="1" :auto-upload="false" class="uploader"
                                draggable action="/" @change="uploadChange" :show-file-list="false">
                                <template #upload-button>
                                    <div class="uploader-wrraper">
                                        <icon-folder-add />
                                        <div>点击或拖拽文件到此区域上传</div>
                                    </div>
                                </template>
                                <template #remove-icon>
                                    <div @click.stop="delFile">
                                        <icon-delete />
                                    </div>
                                </template>
                            </a-upload>
                            <a-form :model="uploadForm" @submit="handleSubmit">
                                <a-form-item field="title" label="资源名称" :validate-trigger="['blur']"
                                    :rules="[{ required: true, message: '请输入资源标签' }, { minLength: 6, message: '资源名称不少于6个字' }, { maxLength: 32, message: '资源名称不超过32个字' }]">
                                    <a-input v-model="uploadForm.title" placeholder="资源名称" allow-clear show-word-limit
                                        :max-length="32" />
                                </a-form-item>
                                <a-form-item field="description" label="资源描述" :validate-trigger="['blur']"
                                    :rules="[{ maxLength: 500, message: '资源描述不超过500个字' }]">
                                    <a-textarea v-model="uploadForm.description" :auto-size="{
                                        minRows: 2,
                                        maxRows: 5
                                    }" :max-length="500" show-word-limit placeholder="资源描述" allow-clear />
                                </a-form-item>
                                <a-form-item field="tags" tooltip="为你的资源选择标签分类，不超过3个" label="资源标签"
                                    :validate-trigger="['blur']" :rules="[{ required: true, message: '请选择资源的标签分类' }]">
                                    <a-select v-model:model-value="uploadForm.tags" placeholder="搜索标签" allow-create multiple
                                        :max-tag-count="3" :limit="3" scrollbar allow-clear>
                                        <a-option v-for="item of tagsList" :value="item.tagName" :label="item.tagName" />
                                    </a-select>
                                </a-form-item>
                                <a-form-item field="fee" tooltip="目前仅开放免费资源上传" label="资源类型">
                                    <a-radio-group v-model="rfee" :options="feeOptions" />
                                </a-form-item>
                                <a-form-item>
                                    <div class="submit-row">
                                        <a-button html-type="submit" type="primary" shape="round">提交</a-button>
                                    </div>
                                </a-form-item>
                            </a-form>
                        </div>
                    </a-card>
                </div>
            </a-col>
            <a-col :span="9">
                <div class="r-extra-container">
                    <a-card :style="{ width: '100%' }">
                        <template #title>
                            <div>
                                <span style="margin-left: 5px">资源排行榜</span>
                            </div>
                        </template>
                        <div class="rank-container">
                            <div class="rank-item" v-for="(i, index) in 3">
                                <div class="rank-number">{{ i }}</div>
                                <div class="rank-avatar"></div>
                                <div class="rank-username">
                                    <div class="rank-user">
                                        <div class="rank-title">C语言排序算法代码</div>
                                        <div class="rank-lv">
                                        </div>
                                    </div>

                                    <div class="description">
                                        <div><icon-eye />1w+浏览</div>
                                        <svg class="iconpark-icon">
                                            <use href="#html-five"></use>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a-card>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import {
    IconUpload, IconFolderAdd, IconDelete, IconThumbUp,
    IconShareInternal,
    IconMore,
    IconUser,
    IconSearch,
    IconEye,
    IconStar,
    IconFile,
} from '@arco-design/web-vue/es/icon';
import { reactive, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { getTagsList } from "@/api/getTagsList";
import { uploadResource, downloadResource } from "@/api/resourceApi";
import { userStore } from "@/store/userStore";
import { calculateFileSize } from "@/utils/fileUtils";
export default {
    name: 'ITYQGIndex',
    components: {
        IconUpload,
        IconFolderAdd,
        IconDelete,
        IconThumbUp,
        IconShareInternal,
        IconMore,
        IconUser,
        IconSearch,
        IconEye,
        IconStar,
        IconFile,
    },
    setup() {
        const resultShow = ref(false)
        const userInfo = userStore()
        const tagsList = ref([])
        const rtags = ref(['Vue', 'JavaScript']);
        const rfee = ref('0');
        const feeOptions = reactive(
            [
                { label: '免费资源', value: '0' },
                { label: '积分资源', value: '1', disabled: true }
            ]
        )
        //资源表单
        const uploadForm = reactive({
            title: '',
            description: '',
            tags:[],
            fee: 0,
            feeCost: 0,
        });
        const file = ref();
        const uploadChange = (_, currentFile) => {
            file.value = {
                ...currentFile,
                // url: URL.createObjectURL(currentFile.file),
            };
            console.log(file.value);
        };
        const delFile = () => {
            file.value = null;
        };
        const getTags = async () => {
            const res = await getTagsList();
            tagsList.value = res.data.data;
        };
        const uploadFile = (v) => {
            //上传form表单
            v.tags = v.tags.filter((item) => {
                return item !== "";
            })
            let form = new FormData();
            form.append("file", file.value?.file);
            form.append("title", v.title);
            form.append("description", v.description);
            form.append("tags", v.tags.join(","));
            form.append("userId", userInfo.userId);
            console.log(form.getAll('userId'));
            uploadResource(form).then((res) => {
                if (res.data.code === 100) {
                    resultShow.value = true;
                    Message.success("上传成功");
                } else {
                    Message.error("上传失败");
                }
                console.log(res);
            })
        }
        const calculateUploadFileSize = (size)=>{
            return calculateFileSize(size)
        }
        return {
            file,
            uploadChange,
            delFile,
            uploadForm,
            rfee,
            feeOptions,
            rtags,
            tagsList,
            getTags,
            uploadFile,
            resultShow,
            calculateUploadFileSize,
        }
    },
    data() {
        return {

        };
    },

    mounted() {
        this.getTags();
    },

    methods: {
        backRefresh() {
            this.resultShow = false;
            this.file = null;
            this.uploadForm = {
                title: '',
                description: '',
                tags: '',
                fee: 0,
                feeCost: 0,
            };
            this.rfee = '0';
            this.rtags = [];
        },
        handleSubmit({ values, errors }) {
            console.log('values:', values, '\nerrors:', errors)
            if (errors) {
                Message.warning("请检查您的填写是否正确");
            } else {
                this.uploadFile(values);
            }

        },
    },
};
</script>

<style lang="less" scoped>
/deep/.arco-card-body {
    padding: 0 !important;
}

.file-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background: #f4f4f4;
    border-radius: 5px;
    margin-bottom: 2rem;
    margin-left: 2rem;

    .file-info {
        display: flex;
        align-items: center;

        .file-icon {
            border-radius: 5px;
            font-size: 32px;
            margin-right: 10px;
        }

        .file-name {
            font-size: 16px;
            color: rgb(var(--arcoblue-7));
            margin-bottom: 2px;
        }

        .file-size {
            font-size: 12px;
            color: var(--color-neutral-6);
        }
    }

    .file-action {
        cursor: pointer;
    }


}

.submit-row {
    width: -webkit-fill-available;
    text-align: right;
}

.r-extra-container {
    position: fixed;
    width: 350px;
    padding: 1rem;
    display: flex;
    justify-content: center;

    .rank-item {
        cursor: pointer;
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f1f1f1;

        .rank-number {
            padding: 5px;
            font-size: 20px;
            margin-right: 10px;
        }

        .rank-username {
            font-size: 14px;
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .rank-user {
                display: flex;
                align-items: center;
                margin-bottom: 15px;
                gap: 1rem;
            }

            .description {
                font-size: 12px;
                color: #909090;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 190px;
                height: 30px;
            }
        }

        &:hover {
            background-color: #fafafa;
        }
    }


}

.u-container {
    margin-left: 20%;
    margin-top: 1rem;

    .u-upload-form {
        padding: 2rem 2rem 1rem 2rem;

        .uploader {
            height: 80px;

            .uploader-wrraper {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 50px;
                background-color: #f5f5f54d;
                border: 1px dashed #a5a5a5;
            }
        }

        .u-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 1.5rem;
        }
    }

}

.container {
    height: 100%;
}
</style>